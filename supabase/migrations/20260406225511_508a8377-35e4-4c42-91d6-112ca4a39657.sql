
-- 1. Add admin-only SELECT policy for contact_leads
CREATE POLICY "Admins can read contact leads"
ON public.contact_leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Harden profiles UPDATE policy with explicit portal_type check (defense in depth alongside trigger)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid() AND portal_type = (SELECT portal_type FROM public.profiles WHERE user_id = auth.uid()));
