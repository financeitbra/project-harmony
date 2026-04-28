-- Fix search path for handle_new_user
ALTER FUNCTION public.handle_new_user() SET search_path = public;

-- Revoke public execution of security definer function
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;