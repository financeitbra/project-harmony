-- Add missing recruiter management columns to jobs table
ALTER TABLE public.jobs
ADD COLUMN IF NOT EXISTS recruiter_notes TEXT,
ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS rejected_by UUID,
ADD COLUMN IF NOT EXISTS last_modified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_modified_by UUID;

-- Add comments
COMMENT ON COLUMN public.jobs.recruiter_notes IS 'Observações do recrutador sobre a vaga';
COMMENT ON COLUMN public.jobs.rejected_at IS 'Data e hora da rejeição';
COMMENT ON COLUMN public.jobs.rejected_by IS 'ID do recrutador que rejeitou';
COMMENT ON COLUMN public.jobs.last_modified_at IS 'Data da última modificação';
COMMENT ON COLUMN public.jobs.last_modified_by IS 'ID do usuário que fez a última modificação';