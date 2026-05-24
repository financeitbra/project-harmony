-- Resetar a senha do usuário administrador usando a função interna do Supabase para garantir o hash correto
UPDATE auth.users 
SET encrypted_password = crypt('FinanceIT2024!', gen_salt('bf')),
    email_confirmed_at = now(),
    updated_at = now(),
    raw_app_meta_data = '{"provider":"email","providers":["email"]}',
    raw_user_meta_data = '{"full_name":"Administrador FinanceIT"}'
WHERE email = 'admin@financeit.com.br';

-- Garantir que o perfil existe e não está forçando reset
INSERT INTO public.profiles (id, role, full_name, password_reset_required)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@financeit.com.br'),
  'admin',
  'Administrador FinanceIT',
  false
)
ON CONFLICT (id) DO UPDATE 
SET password_reset_required = false,
    role = 'admin',
    updated_at = now();
