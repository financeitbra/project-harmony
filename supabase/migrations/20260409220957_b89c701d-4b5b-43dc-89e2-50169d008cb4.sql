
DROP POLICY IF EXISTS "Authenticated users can insert job history" ON public.job_history;

CREATE POLICY "Internos podem inserir historico de vagas"
  ON public.job_history
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
        AND profiles.portal_type = 'interno'
    )
  );
