
ALTER TABLE public.profiles DISABLE TRIGGER enforce_portal_type_immutable;
UPDATE public.profiles SET portal_type = 'interno', updated_at = now() WHERE user_id = '221e287d-d5a6-4fe4-b0cc-d27f6e5eff97';
ALTER TABLE public.profiles ENABLE TRIGGER enforce_portal_type_immutable;
