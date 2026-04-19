-- Drop the current self-referencing UPDATE policy
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create a cleaner UPDATE policy: users can update their own row only
-- The trigger enforce_portal_type_immutable (SECURITY DEFINER) silently reverts portal_type changes
CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());