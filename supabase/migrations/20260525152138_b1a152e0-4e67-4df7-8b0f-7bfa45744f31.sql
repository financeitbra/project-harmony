
-- 1. Fix privilege escalation via profile self-update
-- Replace the permissive update policy with a trigger-based guard
DROP POLICY IF EXISTS profiles_update_user_policy ON public.profiles;

CREATE POLICY profiles_update_user_policy
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Admins can change anything
  IF public.is_admin() THEN
    RETURN NEW;
  END IF;

  -- Non-admins cannot change their role or password_reset_required
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    RAISE EXCEPTION 'Not allowed to change role';
  END IF;

  IF NEW.password_reset_required IS DISTINCT FROM OLD.password_reset_required THEN
    NEW.password_reset_required := OLD.password_reset_required;
  END IF;

  -- Prevent id/email tampering as well
  NEW.id := OLD.id;
  NEW.email := OLD.email;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_profile_privilege_escalation_trg ON public.profiles;
CREATE TRIGGER prevent_profile_privilege_escalation_trg
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_profile_privilege_escalation();

-- 2. Fix privilege escalation via signup metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_first_user BOOLEAN;
BEGIN
  SELECT NOT EXISTS (SELECT 1 FROM public.profiles) INTO is_first_user;

  INSERT INTO public.profiles (id, email, full_name, role, password_reset_required)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    -- Always force default role; ignore any client-supplied role in metadata
    CASE WHEN is_first_user THEN 'admin'::user_role ELSE 'internal'::user_role END,
    TRUE
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 3. Audit logs INSERT: ensure only authenticated users inserting their own id
DROP POLICY IF EXISTS audit_logs_insert_policy ON public.audit_logs;
CREATE POLICY audit_logs_insert_policy
ON public.audit_logs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 4. Revoke EXECUTE on internal SECURITY DEFINER functions that should not be callable via API
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.prevent_profile_privilege_escalation() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_users() FROM PUBLIC, anon;
-- is_admin must remain executable by authenticated for use in RLS policies; revoke from anon
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_users() TO authenticated;
