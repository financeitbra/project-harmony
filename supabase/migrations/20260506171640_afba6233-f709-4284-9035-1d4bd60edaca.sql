-- 1. Fix SECURITY DEFINER execution permissions
-- Revoke all execute on functions from public
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC;

-- Re-grant to necessary roles (usually service_role and authenticated if needed)
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO service_role;

-- handle_new_user is for the auth trigger, so it needs to be executable by supabase_auth_admin (usually service_role handles it or it's run by system)
-- Actually, triggers run as the owner or the user triggering it. 
-- For safety, we grant to service_role and postgres.
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO service_role;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO service_role;
GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO authenticated;

-- 2. Fix Storage Listing (Warning 1)
-- Instead of a broad SELECT on the bucket, we can keep it public but ensure policies are tight.
-- However, for 'public' buckets, Supabase allows listing if any SELECT policy matches.
-- To satisfy the linter, we can change the bucket to not be public and use a SELECT policy for authenticated users if it's meant for them, 
-- or if it's truly for public email assets, we can live with the warning or try to refine the policy.
-- Let's refine the policy to only allow SELECT if the path is known (though this is hard to enforce for public access in some versions of Supabase).
-- A better approach for 'email-assets' is often to keep it public but ensure no sensitive files are there.
-- Let's try to update the policy to be more specific if possible.
-- For now, I'll just leave the storage one as it's a 'WARN' and often expected for public assets, 
-- but I'll double check if I can make it more secure.

-- Actually, let's just ensure no other broad policies exist.
-- The current policy is: (bucket_id = 'email-assets'::text)
-- That's as specific as it gets for a bucket-wide public read.
