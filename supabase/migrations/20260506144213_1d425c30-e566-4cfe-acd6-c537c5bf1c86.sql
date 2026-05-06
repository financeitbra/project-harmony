-- Fix function search_path
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Restrict listing on public email-assets bucket
DROP POLICY IF EXISTS "Public can list email-assets" ON storage.objects;

CREATE POLICY "Public can read email-assets"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'email-assets');
