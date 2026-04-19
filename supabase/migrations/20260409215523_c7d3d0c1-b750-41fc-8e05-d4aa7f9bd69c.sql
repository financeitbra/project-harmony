-- Fix: the old policy checks profiles.id = auth.uid() which is wrong
-- profiles.id is a generated UUID, user_id is the auth reference
DROP POLICY IF EXISTS "Internos podem ver todas as vagas" ON public.jobs;

CREATE POLICY "Internos podem ver todas as vagas"
  ON public.jobs
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
        AND profiles.portal_type = 'interno'
    )
  );