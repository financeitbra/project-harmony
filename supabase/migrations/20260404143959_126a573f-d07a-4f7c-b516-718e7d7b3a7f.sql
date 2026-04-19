CREATE POLICY "Deny anon insert" ON public.contact_leads FOR INSERT TO anon WITH CHECK (false);

CREATE POLICY "Allow service role all" ON public.contact_leads FOR ALL TO service_role USING (true) WITH CHECK (true);