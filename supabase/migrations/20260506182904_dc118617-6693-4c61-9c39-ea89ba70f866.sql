CREATE OR REPLACE FUNCTION public.has_users()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM auth.users LIMIT 1);
END;
$$;

GRANT EXECUTE ON FUNCTION public.has_users() TO anon, authenticated, service_role;