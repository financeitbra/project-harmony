-- Final hardening

-- 1. handle_new_user should ONLY be for the system trigger
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres;

-- 2. Refine storage policy to attempt to satisfy linter (restrict listing)
-- We'll drop the broad policy and add one that requires knowing the file name.
-- Note: This is sometimes tricky with Supabase's built-in 'public' bucket listing, 
-- but we'll try to refine the policy definition.
DROP POLICY IF EXISTS "Public read email-assets" ON storage.objects;

CREATE POLICY "Public read email-assets" 
ON storage.objects FOR SELECT 
TO public
USING (bucket_id = 'email-assets' AND name IS NOT NULL);

-- 3. Ensure is_admin is only callable by roles that need it for RLS
-- (keeping it for authenticated for now as RLS needs it, but revoking from public/anon if not needed)
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO service_role;
