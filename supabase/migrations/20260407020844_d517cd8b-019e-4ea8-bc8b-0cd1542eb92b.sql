
-- 1. Create SECURITY DEFINER function to get current portal_type (avoids recursion)
CREATE OR REPLACE FUNCTION public.get_own_portal_type(_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT portal_type FROM public.profiles WHERE user_id = _user_id LIMIT 1
$$;

-- 2. Drop the current permissive UPDATE policy
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 3. Create new UPDATE policy: user can update own row BUT portal_type must remain unchanged
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid()
  AND portal_type = get_own_portal_type(auth.uid())
);
