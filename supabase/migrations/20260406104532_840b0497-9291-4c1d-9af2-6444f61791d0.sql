
-- 1. Create a trigger function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, portal_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'portal_type', 'cliente')
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 2. Create unique constraint on profiles.user_id for ON CONFLICT to work
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);

-- 3. Create trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Create internal_invites table for controlled onboarding
CREATE TABLE public.internal_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  invited_by uuid REFERENCES auth.users(id),
  token text NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  used boolean NOT NULL DEFAULT false,
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '7 days'),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT internal_invites_email_unique UNIQUE (email)
);

ALTER TABLE public.internal_invites ENABLE ROW LEVEL SECURITY;

-- Only service_role and admins can manage invites
CREATE POLICY "Service role full access on internal_invites"
  ON public.internal_invites FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Admins can view invites
CREATE POLICY "Admins can view invites"
  ON public.internal_invites FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can create invites
CREATE POLICY "Admins can insert invites"
  ON public.internal_invites FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
