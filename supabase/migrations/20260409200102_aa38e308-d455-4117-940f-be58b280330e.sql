
-- Add new approval-related columns
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS approved_by UUID;

-- Add comments
COMMENT ON COLUMN public.jobs.rejection_reason IS 'Motivo da rejeição da vaga (se aplicável)';
COMMENT ON COLUMN public.jobs.approved_at IS 'Data e hora da aprovação da vaga';
COMMENT ON COLUMN public.jobs.approved_by IS 'ID do recrutador que aprovou a vaga';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_client_id ON public.jobs(client_id);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs(created_at DESC);
