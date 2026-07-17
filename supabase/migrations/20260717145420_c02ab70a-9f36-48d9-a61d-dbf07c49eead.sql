
-- Strengthen protection against privilege escalation: revoke column-level UPDATE on sensitive columns
REVOKE UPDATE ON public.profiles FROM authenticated;
GRANT UPDATE (full_name, avatar_url, password_reset_required, password_updated_at, updated_at) ON public.profiles TO authenticated;

-- Harden trigger to also raise (not silently reset) when password_reset_required is changed by non-admin? keep current behavior.
-- Ensure trigger raises for role tampering (already does)
