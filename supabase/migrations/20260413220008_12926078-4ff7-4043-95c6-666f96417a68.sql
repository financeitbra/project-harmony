
-- Create a secure view for public job listings (excludes sensitive internal fields)
CREATE OR REPLACE VIEW public.public_jobs AS
SELECT
  id, title, description, requirements, job_type, department, location,
  salary_min, salary_max, published_at, created_at, status, seniority, area
FROM public.jobs
WHERE status = 'open';

-- Grant anon access to the view
GRANT SELECT ON public.public_jobs TO anon;

-- Drop the existing anon policy that exposes all columns
DROP POLICY IF EXISTS "Public can view open jobs" ON public.jobs;
