-- Switch is_admin to SECURITY INVOKER
ALTER FUNCTION public.is_admin() SECURITY INVOKER;

-- Also ensure it has a search_path set for security (though less critical for invoker, it's good practice)
ALTER FUNCTION public.is_admin() SET search_path = public;
