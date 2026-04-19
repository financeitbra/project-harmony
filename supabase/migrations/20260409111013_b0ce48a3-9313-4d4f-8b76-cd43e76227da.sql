
-- 1. Add status column to job_applications for kanban workflow
ALTER TABLE public.job_applications 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

-- 2. Client RLS policies for jobs table
-- Clients can see jobs where their profile id matches client_id
CREATE POLICY "Clientes veem proprias vagas" ON public.jobs 
FOR SELECT USING (
  client_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- Clients can request new jobs (insert with their profile as client_id)
CREATE POLICY "Clientes podem solicitar vagas" ON public.jobs 
FOR INSERT WITH CHECK (
  client_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- 3. Allow authenticated users with permission to update job_applications status
CREATE POLICY "Users with permission can update applications" ON public.job_applications
FOR UPDATE USING (
  (job_id IN (SELECT id FROM jobs WHERE responsible_user_id = auth.uid() OR created_by = auth.uid()))
  OR has_permission(auth.uid(), 'jobs', 'update')
)
WITH CHECK (
  (job_id IN (SELECT id FROM jobs WHERE responsible_user_id = auth.uid() OR created_by = auth.uid()))
  OR has_permission(auth.uid(), 'jobs', 'update')
);

-- 4. Public anonymous insert policy for job applications (anyone can apply)
CREATE POLICY "Anyone can apply to open jobs" ON public.job_applications
FOR INSERT WITH CHECK (
  job_id IN (SELECT id FROM public.jobs WHERE status = 'open')
);
