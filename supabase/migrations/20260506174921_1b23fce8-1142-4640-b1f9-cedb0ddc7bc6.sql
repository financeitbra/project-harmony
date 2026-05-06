-- Revoke execute from public to address security definer vulnerability
REVOKE EXECUTE ON FUNCTION public.has_users() FROM public;
REVOKE EXECUTE ON FUNCTION public.has_users() FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_users() FROM authenticated;

-- Ensure it's still callable by service_role if needed, but the linter warns about public/anon/auth
GRANT EXECUTE ON FUNCTION public.has_users() TO service_role;