CREATE OR REPLACE FUNCTION public.has_users()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM public.profiles);
END;
$$;

GRANT EXECUTE ON FUNCTION public.has_users() TO anon, authenticated;