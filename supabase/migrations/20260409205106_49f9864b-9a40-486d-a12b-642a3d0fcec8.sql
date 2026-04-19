
-- Fix handle_new_user trigger to include user_id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_full_name text;
BEGIN
  v_full_name := COALESCE(
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'name',
    split_part(new.email, '@', 1)
  );

  INSERT INTO public.profiles (id, user_id, email, full_name, portal_type, created_at)
  VALUES (
    gen_random_uuid(),
    new.id,
    new.email,
    v_full_name,
    'cliente',
    now()
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN new;
END;
$function$;
