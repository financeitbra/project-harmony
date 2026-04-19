
-- Drop the old constraint and recreate with pending_approval included
ALTER TABLE public.jobs DROP CONSTRAINT IF EXISTS check_job_status;
ALTER TABLE public.jobs DROP CONSTRAINT IF EXISTS jobs_status_check;

ALTER TABLE public.jobs ADD CONSTRAINT jobs_status_check 
  CHECK (status IN ('draft', 'pending_approval', 'approved', 'open', 'closed', 'archived', 'rejected', 'cancelled'));
