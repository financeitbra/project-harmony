
-- 1. Add job_code column (nullable first for backfill)
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS job_code VARCHAR(10);

-- 2. Add audit columns (published_at already exists)
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS edited_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS edited_by UUID,
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS archived_by UUID,
ADD COLUMN IF NOT EXISTS published_by UUID,
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT FALSE;

-- 3. Function to generate sequential FIT-XXXXX codes
CREATE OR REPLACE FUNCTION public.generate_job_code()
RETURNS VARCHAR(10)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_counter INT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(job_code, 5) AS INTEGER)), 0) + 1
  INTO v_counter
  FROM public.jobs
  WHERE job_code LIKE 'FIT-%';
  
  RETURN 'FIT-' || LPAD(v_counter::TEXT, 5, '0');
END;
$$;

-- 4. Backfill existing rows
DO $$
DECLARE
  r RECORD;
  v_counter INT := 0;
BEGIN
  FOR r IN SELECT id FROM public.jobs WHERE job_code IS NULL ORDER BY created_at ASC LOOP
    v_counter := v_counter + 1;
    UPDATE public.jobs SET job_code = 'FIT-' || LPAD(v_counter::TEXT, 5, '0') WHERE id = r.id;
  END LOOP;
END;
$$;

-- 5. Now make it NOT NULL with unique constraint
ALTER TABLE public.jobs ALTER COLUMN job_code SET NOT NULL;
ALTER TABLE public.jobs ALTER COLUMN job_code SET DEFAULT '';
ALTER TABLE public.jobs ADD CONSTRAINT jobs_job_code_unique UNIQUE (job_code);

-- 6. Trigger to auto-generate job_code on insert
CREATE OR REPLACE FUNCTION public.set_job_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.job_code = '' OR NEW.job_code IS NULL THEN
    NEW.job_code := public.generate_job_code();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_set_job_code ON public.jobs;
CREATE TRIGGER trigger_set_job_code
BEFORE INSERT ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.set_job_code();

-- 7. Create job_history table
CREATE TABLE IF NOT EXISTS public.job_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL,
  changed_by UUID,
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  old_values JSONB,
  new_values JSONB,
  notes TEXT
);

ALTER TABLE public.job_history ENABLE ROW LEVEL SECURITY;

-- Internal users can view job history
CREATE POLICY "Internos podem ver historico de vagas"
  ON public.job_history
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
        AND profiles.portal_type = 'interno'
    )
  );

-- Service role full access
CREATE POLICY "Service role full access on job_history"
  ON public.job_history
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Authenticated users can insert history entries
CREATE POLICY "Authenticated users can insert job history"
  ON public.job_history
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Clients can see history for their own jobs
CREATE POLICY "Clientes veem historico das proprias vagas"
  ON public.job_history
  FOR SELECT
  TO authenticated
  USING (
    job_id IN (
      SELECT j.id FROM public.jobs j
      WHERE j.client_id IN (
        SELECT p.id FROM public.profiles p
        WHERE p.user_id = auth.uid()
      )
    )
  );

-- 8. Indexes
CREATE INDEX IF NOT EXISTS idx_jobs_job_code ON public.jobs(job_code);
CREATE INDEX IF NOT EXISTS idx_jobs_is_archived ON public.jobs(is_archived);
CREATE INDEX IF NOT EXISTS idx_jobs_is_published ON public.jobs(is_published);
CREATE INDEX IF NOT EXISTS idx_job_history_job_id ON public.job_history(job_id);
CREATE INDEX IF NOT EXISTS idx_job_history_changed_at ON public.job_history(changed_at DESC);

-- 9. Add DELETE policy for internal users on jobs (for permanent delete)
CREATE POLICY "Internos podem deletar vagas arquivadas"
  ON public.jobs
  FOR DELETE
  TO authenticated
  USING (
    is_archived = TRUE
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
        AND profiles.portal_type = 'interno'
    )
  );
