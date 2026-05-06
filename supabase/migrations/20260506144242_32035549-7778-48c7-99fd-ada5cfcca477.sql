-- Revoke execute on internal/security definer functions from anon and authenticated
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, public;
-- is_admin is used in RLS policies for authenticated users; keep that grant
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Remove public SELECT on storage.objects (prevents listing). Public file URLs still work via the storage public endpoint.
DROP POLICY IF EXISTS "Public can read email-assets" ON storage.objects;
