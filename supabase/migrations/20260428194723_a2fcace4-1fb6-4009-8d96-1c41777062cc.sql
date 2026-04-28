-- Create a function to check if the current user is an admin without causing recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop the problematic policy
DROP POLICY IF EXISTS "Admins can do everything" ON public.profiles;

-- Re-create the admin policy using the security definer function
CREATE POLICY "Admins can do everything"
ON public.profiles
FOR ALL
TO authenticated
USING (public.is_admin());

-- Ensure the self-view policy is still there (it is, but let's be safe if it was dropped or modified)
-- The previous list showed: "Users can view their own profile" qual:(auth.uid() = id)
-- This one is safe and doesn't cause recursion.
