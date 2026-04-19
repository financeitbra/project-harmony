
-- 1. Remove ALL existing policies on contact_leads
DROP POLICY IF EXISTS "Allow service role all" ON public.contact_leads;
DROP POLICY IF EXISTS "Deny anon insert" ON public.contact_leads;

-- 2. Single explicit policy: only service_role has access
CREATE POLICY "Service role full access"
ON public.contact_leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
