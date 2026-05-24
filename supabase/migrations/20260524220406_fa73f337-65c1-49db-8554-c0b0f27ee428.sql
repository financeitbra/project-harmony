-- Fix is_admin recursion issue
CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER -- This allows the function to bypass RLS
 SET search_path TO 'public'
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Ensure audit_logs has proper structure if not already
-- (I'll check if it exists first, but I saw it in the table list)

-- Create a view or component for audit logs if needed, but for now let's just make sure the RLS is correct.
-- The existing audit_logs_select_policy: ((auth.uid() = user_id) OR is_admin())
-- Now that is_admin() is fixed, this should work.
