REVOKE EXECUTE ON FUNCTION public.has_users() FROM anon, PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_users() TO authenticated, service_role;