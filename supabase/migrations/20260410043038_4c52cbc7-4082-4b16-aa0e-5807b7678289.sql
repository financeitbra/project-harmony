-- Add old_status and new_status to job_history for timeline tracking
ALTER TABLE public.job_history
ADD COLUMN IF NOT EXISTS old_status TEXT,
ADD COLUMN IF NOT EXISTS new_status TEXT;