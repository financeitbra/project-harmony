-- Allow public/anonymous users to read open jobs
CREATE POLICY "Public can view open jobs"
ON public.jobs
FOR SELECT
TO anon
USING (status = 'open');