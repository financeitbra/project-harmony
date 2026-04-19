
-- =============================================
-- JOB MANAGEMENT SYSTEM — TABLES
-- =============================================

-- 1. JOBS TABLE
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  job_type TEXT NOT NULL CHECK (job_type IN ('clt', 'pj', 'temporary', 'internship')),
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_min NUMERIC(10, 2),
  salary_max NUMERIC(10, 2),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'open', 'closed', 'cancelled')),
  published_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  responsible_user_id UUID NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT salary_valid CHECK (salary_min IS NULL OR salary_max IS NULL OR salary_min <= salary_max)
);

CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_department ON public.jobs(department);
CREATE INDEX idx_jobs_responsible ON public.jobs(responsible_user_id);
CREATE INDEX idx_jobs_created_at ON public.jobs(created_at DESC);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view jobs they own or are responsible for or have permission"
ON public.jobs FOR SELECT TO authenticated
USING (
  created_by = auth.uid()
  OR responsible_user_id = auth.uid()
  OR public.has_permission(auth.uid(), 'jobs', 'read')
);

CREATE POLICY "Users with permission can create jobs"
ON public.jobs FOR INSERT TO authenticated
WITH CHECK (public.has_permission(auth.uid(), 'jobs', 'create'));

CREATE POLICY "Users can update own jobs or with permission"
ON public.jobs FOR UPDATE TO authenticated
USING (
  created_by = auth.uid()
  OR responsible_user_id = auth.uid()
  OR public.has_permission(auth.uid(), 'jobs', 'update')
)
WITH CHECK (
  created_by = auth.uid()
  OR responsible_user_id = auth.uid()
  OR public.has_permission(auth.uid(), 'jobs', 'update')
);

CREATE POLICY "Service role full access on jobs"
ON public.jobs FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- 2. JOB CANDIDATES TABLE
CREATE TABLE public.job_candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  candidate_name TEXT NOT NULL,
  candidate_email TEXT NOT NULL,
  candidate_phone TEXT,
  candidate_cv_url TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'interview_scheduled', 'offered', 'hired', 'rejected')),
  notes TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_job_candidates_job_id ON public.job_candidates(job_id);
CREATE INDEX idx_job_candidates_status ON public.job_candidates(status);

ALTER TABLE public.job_candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view candidates for their jobs or with permission"
ON public.job_candidates FOR SELECT TO authenticated
USING (
  job_id IN (SELECT id FROM public.jobs WHERE responsible_user_id = auth.uid() OR created_by = auth.uid())
  OR public.has_permission(auth.uid(), 'jobs', 'read')
);

CREATE POLICY "Users with permission can insert candidates"
ON public.job_candidates FOR INSERT TO authenticated
WITH CHECK (public.has_permission(auth.uid(), 'jobs', 'update'));

CREATE POLICY "Users with permission can update candidates"
ON public.job_candidates FOR UPDATE TO authenticated
USING (
  job_id IN (SELECT id FROM public.jobs WHERE responsible_user_id = auth.uid() OR created_by = auth.uid())
  OR public.has_permission(auth.uid(), 'jobs', 'update')
);

CREATE POLICY "Service role full access on job_candidates"
ON public.job_candidates FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- 3. JOB AUDIT LOG TABLE
CREATE TABLE public.job_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'publish', 'close', 'delete')),
  user_id UUID NOT NULL,
  old_values JSONB,
  new_values JSONB,
  changes JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_job_audit_job_id ON public.job_audit_log(job_id);
CREATE INDEX idx_job_audit_created_at ON public.job_audit_log(created_at DESC);

ALTER TABLE public.job_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users with audit permission can view job audit logs"
ON public.job_audit_log FOR SELECT TO authenticated
USING (public.has_permission(auth.uid(), 'audit_logs', 'read'));

CREATE POLICY "Service role full access on job_audit_log"
ON public.job_audit_log FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- 4. JOB APPLICATIONS TABLE (public submissions)
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  applicant_message TEXT,
  cv_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

CREATE INDEX idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX idx_job_applications_created_at ON public.job_applications(created_at DESC);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users with permission can view applications"
ON public.job_applications FOR SELECT TO authenticated
USING (
  job_id IN (SELECT id FROM public.jobs WHERE responsible_user_id = auth.uid() OR created_by = auth.uid())
  OR public.has_permission(auth.uid(), 'jobs', 'read')
);

CREATE POLICY "Service role full access on job_applications"
ON public.job_applications FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- 5. JOB NOTIFICATIONS TABLE
CREATE TABLE public.job_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  notification_type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_job_notifications_user_id ON public.job_notifications(user_id);
CREATE INDEX idx_job_notifications_read ON public.job_notifications(read);

ALTER TABLE public.job_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own job notifications"
ON public.job_notifications FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can update own job notifications"
ON public.job_notifications FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role full access on job_notifications"
ON public.job_notifications FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- =============================================
-- TRIGGER: auto-update updated_at
-- =============================================
CREATE OR REPLACE FUNCTION public.update_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW EXECUTE FUNCTION public.update_jobs_updated_at();

CREATE TRIGGER update_job_candidates_updated_at
BEFORE UPDATE ON public.job_candidates
FOR EACH ROW EXECUTE FUNCTION public.update_jobs_updated_at();

-- =============================================
-- FUNCTIONS
-- =============================================

-- create_job
CREATE OR REPLACE FUNCTION public.create_job(
  p_title TEXT,
  p_description TEXT,
  p_requirements TEXT,
  p_job_type TEXT,
  p_department TEXT,
  p_location TEXT,
  p_salary_min NUMERIC DEFAULT NULL,
  p_salary_max NUMERIC DEFAULT NULL,
  p_responsible_user_id UUID DEFAULT NULL,
  p_status TEXT DEFAULT 'draft'
) RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_job_id UUID;
  v_user_id UUID;
  v_final_status TEXT;
BEGIN
  v_user_id := auth.uid();

  IF NOT public.has_permission(v_user_id, 'jobs', 'create') THEN
    RAISE EXCEPTION 'Sem permissão para criar vagas';
  END IF;

  IF TRIM(p_title) = '' OR p_title IS NULL THEN
    RAISE EXCEPTION 'Título é obrigatório';
  END IF;

  IF TRIM(p_description) = '' OR p_description IS NULL THEN
    RAISE EXCEPTION 'Descrição é obrigatória';
  END IF;

  IF TRIM(p_requirements) = '' OR p_requirements IS NULL THEN
    RAISE EXCEPTION 'Requisitos são obrigatórios';
  END IF;

  IF p_salary_min IS NOT NULL AND p_salary_max IS NOT NULL AND p_salary_min > p_salary_max THEN
    RAISE EXCEPTION 'Salário mínimo não pode ser maior que máximo';
  END IF;

  v_final_status := CASE WHEN p_status = 'open' THEN 'open' ELSE 'draft' END;

  INSERT INTO public.jobs (
    title, description, requirements, job_type, department, location,
    salary_min, salary_max, responsible_user_id, created_by, status,
    published_at
  ) VALUES (
    TRIM(p_title), TRIM(p_description), TRIM(p_requirements), p_job_type, p_department, p_location,
    p_salary_min, p_salary_max, COALESCE(p_responsible_user_id, v_user_id), v_user_id,
    v_final_status,
    CASE WHEN v_final_status = 'open' THEN NOW() ELSE NULL END
  ) RETURNING id INTO v_job_id;

  -- Audit
  INSERT INTO public.job_audit_log (job_id, action, user_id, new_values)
  VALUES (v_job_id, 'create', v_user_id, jsonb_build_object(
    'title', p_title, 'status', v_final_status, 'department', p_department
  ));

  RETURN v_job_id;
END;
$$;

-- update_job
CREATE OR REPLACE FUNCTION public.update_job(
  p_job_id UUID,
  p_title TEXT DEFAULT NULL,
  p_description TEXT DEFAULT NULL,
  p_requirements TEXT DEFAULT NULL,
  p_job_type TEXT DEFAULT NULL,
  p_department TEXT DEFAULT NULL,
  p_location TEXT DEFAULT NULL,
  p_salary_min NUMERIC DEFAULT NULL,
  p_salary_max NUMERIC DEFAULT NULL,
  p_responsible_user_id UUID DEFAULT NULL,
  p_status TEXT DEFAULT NULL
) RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_old JSONB;
BEGIN
  v_user_id := auth.uid();

  IF NOT (
    EXISTS(SELECT 1 FROM public.jobs WHERE id = p_job_id AND (created_by = v_user_id OR responsible_user_id = v_user_id))
    OR public.has_permission(v_user_id, 'jobs', 'update')
  ) THEN
    RAISE EXCEPTION 'Sem permissão para editar esta vaga';
  END IF;

  SELECT jsonb_build_object('title', title, 'description', description, 'status', status, 'department', department)
  INTO v_old FROM public.jobs WHERE id = p_job_id;

  IF v_old IS NULL THEN
    RAISE EXCEPTION 'Vaga não encontrada';
  END IF;

  UPDATE public.jobs SET
    title = COALESCE(p_title, title),
    description = COALESCE(p_description, description),
    requirements = COALESCE(p_requirements, requirements),
    job_type = COALESCE(p_job_type, job_type),
    department = COALESCE(p_department, department),
    location = COALESCE(p_location, location),
    salary_min = COALESCE(p_salary_min, salary_min),
    salary_max = COALESCE(p_salary_max, salary_max),
    responsible_user_id = COALESCE(p_responsible_user_id, responsible_user_id),
    status = COALESCE(p_status, status),
    published_at = CASE
      WHEN COALESCE(p_status, status) = 'open' AND status != 'open' THEN NOW()
      ELSE published_at
    END,
    closed_at = CASE
      WHEN COALESCE(p_status, status) IN ('closed', 'cancelled') AND status NOT IN ('closed', 'cancelled') THEN NOW()
      ELSE closed_at
    END
  WHERE id = p_job_id;

  INSERT INTO public.job_audit_log (job_id, action, user_id, old_values, new_values)
  VALUES (p_job_id, 'update', v_user_id, v_old, jsonb_build_object(
    'title', COALESCE(p_title, v_old->>'title'), 'status', COALESCE(p_status, v_old->>'status')
  ));

  RETURN TRUE;
END;
$$;

-- close_job
CREATE OR REPLACE FUNCTION public.close_job(
  p_job_id UUID,
  p_reason TEXT DEFAULT NULL
) RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();

  IF NOT (
    EXISTS(SELECT 1 FROM public.jobs WHERE id = p_job_id AND (created_by = v_user_id OR responsible_user_id = v_user_id))
    OR public.has_permission(v_user_id, 'jobs', 'update')
  ) THEN
    RAISE EXCEPTION 'Sem permissão para fechar esta vaga';
  END IF;

  UPDATE public.jobs SET status = 'closed', closed_at = NOW() WHERE id = p_job_id;

  INSERT INTO public.job_audit_log (job_id, action, user_id, new_values)
  VALUES (p_job_id, 'close', v_user_id, jsonb_build_object('reason', p_reason));

  RETURN TRUE;
END;
$$;

-- update_candidate_status
CREATE OR REPLACE FUNCTION public.update_candidate_status(
  p_candidate_id UUID,
  p_status TEXT,
  p_notes TEXT DEFAULT NULL,
  p_rejection_reason TEXT DEFAULT NULL
) RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_job_id UUID;
BEGIN
  v_user_id := auth.uid();

  SELECT job_id INTO v_job_id FROM public.job_candidates WHERE id = p_candidate_id;
  IF v_job_id IS NULL THEN
    RAISE EXCEPTION 'Candidato não encontrado';
  END IF;

  IF NOT (
    EXISTS(SELECT 1 FROM public.jobs WHERE id = v_job_id AND (created_by = v_user_id OR responsible_user_id = v_user_id))
    OR public.has_permission(v_user_id, 'jobs', 'update')
  ) THEN
    RAISE EXCEPTION 'Sem permissão para atualizar candidatos';
  END IF;

  UPDATE public.job_candidates SET
    status = p_status,
    notes = COALESCE(p_notes, notes),
    rejection_reason = CASE WHEN p_status = 'rejected' THEN p_rejection_reason ELSE rejection_reason END
  WHERE id = p_candidate_id;

  INSERT INTO public.job_audit_log (job_id, action, user_id, new_values)
  VALUES (v_job_id, 'update', v_user_id, jsonb_build_object(
    'candidate_id', p_candidate_id, 'status', p_status
  ));

  RETURN TRUE;
END;
$$;

-- =============================================
-- PERMISSIONS — add job-related permissions
-- =============================================
INSERT INTO public.permissions (resource, action, description, category, is_system)
VALUES
  ('jobs', 'create', 'Criar vagas de emprego', 'Vagas', true),
  ('jobs', 'read', 'Visualizar todas as vagas', 'Vagas', true),
  ('jobs', 'update', 'Editar vagas de emprego', 'Vagas', true),
  ('jobs', 'delete', 'Excluir vagas de emprego', 'Vagas', true);
