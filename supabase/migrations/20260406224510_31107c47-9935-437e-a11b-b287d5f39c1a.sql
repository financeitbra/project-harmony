
-- 1. Drop the existing UPDATE policy that allows unrestricted column changes
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 2. Create a restricted UPDATE policy that prevents changing portal_type
-- Uses a trigger-based approach: we create a function that blocks portal_type changes
CREATE OR REPLACE FUNCTION public.prevent_portal_type_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only service_role can change portal_type (handled outside RLS)
  -- For regular users, force portal_type to remain unchanged
  IF NEW.portal_type IS DISTINCT FROM OLD.portal_type THEN
    NEW.portal_type := OLD.portal_type;
  END IF;
  RETURN NEW;
END;
$$;

-- 3. Create the trigger on profiles table
DROP TRIGGER IF EXISTS enforce_portal_type_immutable ON public.profiles;
CREATE TRIGGER enforce_portal_type_immutable
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_portal_type_change();

-- 4. Re-create the UPDATE policy (same user_id check, but now trigger protects portal_type)
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 5. Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- 6. Create a restricted INSERT policy that forces portal_type to 'cliente'
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND portal_type = 'cliente'
);
