
-- =============================================
-- ADMIN PANEL: Tables, Functions, RLS Policies
-- =============================================

-- TABELA: system_settings
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  description TEXT,
  updated_by UUID,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_setting_key CHECK (setting_key ~ '^[a-z0-9_]+$')
);

-- TABELA: user_activities
CREATE TABLE IF NOT EXISTS public.user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  resource TEXT,
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABELA: system_notifications
CREATE TABLE IF NOT EXISTS public.system_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON public.system_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_created_at ON public.user_activities(created_at);
CREATE INDEX IF NOT EXISTS idx_user_activities_type ON public.user_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_system_notifications_user_id ON public.system_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_system_notifications_read_at ON public.system_notifications(read_at);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_notifications ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES
-- =============================================

-- system_settings
CREATE POLICY "Admins can read system settings"
  ON public.system_settings FOR SELECT
  USING (public.has_permission(auth.uid(), 'system_settings', 'read'));

CREATE POLICY "Admins can update system settings"
  ON public.system_settings FOR ALL
  USING (public.has_permission(auth.uid(), 'system_settings', 'update'))
  WITH CHECK (public.has_permission(auth.uid(), 'system_settings', 'update'));

CREATE POLICY "Service role full access on system_settings"
  ON public.system_settings FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- user_activities
CREATE POLICY "Users can view own activities or if permitted"
  ON public.user_activities FOR SELECT
  USING (auth.uid() = user_id OR public.has_permission(auth.uid(), 'audit_logs', 'read'));

CREATE POLICY "Service role full access on user_activities"
  ON public.user_activities FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- system_notifications
CREATE POLICY "Users can view own notifications"
  ON public.system_notifications FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own notifications"
  ON public.system_notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can create system notifications"
  ON public.system_notifications FOR INSERT
  WITH CHECK (public.has_permission(auth.uid(), 'system_notifications', 'create'));

CREATE POLICY "Service role full access on system_notifications"
  ON public.system_notifications FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- =============================================
-- SQL FUNCTIONS (SECURITY DEFINER)
-- =============================================

-- get_users_with_roles: lists users with their roles (queries auth.users)
CREATE OR REPLACE FUNCTION public.get_users_with_roles()
RETURNS TABLE(
  user_id UUID,
  email TEXT,
  full_name TEXT,
  roles TEXT[],
  last_sign_in TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  is_active BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'users', 'read') THEN
    RAISE EXCEPTION 'Permissão negada: users:read';
  END IF;

  RETURN QUERY
  SELECT
    u.id,
    u.email::TEXT,
    COALESCE(p.full_name, '')::TEXT,
    COALESCE(ARRAY_AGG(r.name) FILTER (WHERE r.name IS NOT NULL), ARRAY[]::TEXT[]),
    u.last_sign_in_at,
    u.created_at,
    (u.email_confirmed_at IS NOT NULL AND u.banned_until IS NULL)
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.user_id = u.id
  LEFT JOIN public.user_roles ur ON u.id = ur.user_id AND ur.is_active = TRUE
  LEFT JOIN public.roles r ON ur.role_id = r.id
  GROUP BY u.id, u.email, p.full_name, u.last_sign_in_at, u.created_at, u.email_confirmed_at, u.banned_until
  ORDER BY u.created_at DESC;
END;
$$;

-- get_all_roles_with_permissions
CREATE OR REPLACE FUNCTION public.get_all_roles_with_permissions()
RETURNS TABLE(
  role_id UUID,
  role_name TEXT,
  role_description TEXT,
  role_color TEXT,
  role_icon TEXT,
  role_is_system BOOLEAN,
  permissions JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'roles', 'read') THEN
    RAISE EXCEPTION 'Permissão negada: roles:read';
  END IF;

  RETURN QUERY
  SELECT
    r.id,
    r.name,
    r.description,
    r.color,
    r.icon,
    COALESCE(r.is_system, false),
    COALESCE(
      JSONB_AGG(
        JSONB_BUILD_OBJECT('id', perm.id, 'resource', perm.resource, 'action', perm.action, 'description', perm.description)
      ) FILTER (WHERE perm.id IS NOT NULL),
      '[]'::JSONB
    )
  FROM public.roles r
  LEFT JOIN public.role_permissions rp ON r.id = rp.role_id
  LEFT JOIN public.permissions perm ON rp.permission_id = perm.id
  GROUP BY r.id, r.name, r.description, r.color, r.icon, r.is_system
  ORDER BY r.name;
END;
$$;

-- get_system_statistics
CREATE OR REPLACE FUNCTION public.get_system_statistics()
RETURNS TABLE(
  total_users BIGINT,
  active_users BIGINT,
  total_roles BIGINT,
  total_permissions BIGINT,
  total_audit_logs BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(auth.uid(), 'dashboard', 'read') THEN
    RAISE EXCEPTION 'Permissão negada: dashboard:read';
  END IF;

  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM auth.users),
    (SELECT COUNT(DISTINCT ur.user_id) FROM public.user_roles ur WHERE ur.is_active = TRUE),
    (SELECT COUNT(*) FROM public.roles),
    (SELECT COUNT(*) FROM public.permissions),
    (SELECT COUNT(*) FROM public.audit_logs);
END;
$$;

-- update_system_setting
CREATE OR REPLACE FUNCTION public.update_system_setting(
  p_key TEXT,
  p_value JSONB,
  p_updated_by UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
BEGIN
  IF NOT public.has_permission(p_updated_by, 'system_settings', 'update') THEN
    RAISE EXCEPTION 'Permissão negada: system_settings:update';
  END IF;

  INSERT INTO public.system_settings (setting_key, setting_value, updated_by)
  VALUES (p_key, p_value, p_updated_by)
  ON CONFLICT (setting_key) DO UPDATE
  SET setting_value = EXCLUDED.setting_value,
      updated_by = EXCLUDED.updated_by,
      updated_at = NOW()
  RETURNING id INTO v_id;

  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, new_values, status)
  VALUES (p_updated_by, 'update_setting', 'system_settings', v_id, JSONB_BUILD_OBJECT('key', p_key, 'value', p_value), 'success');

  RETURN JSONB_BUILD_OBJECT('success', true);
END;
$$;

-- get_system_setting
CREATE OR REPLACE FUNCTION public.get_system_setting(p_key TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_value JSONB;
BEGIN
  IF NOT public.has_permission(auth.uid(), 'system_settings', 'read') THEN
    RAISE EXCEPTION 'Permissão negada: system_settings:read';
  END IF;

  SELECT setting_value INTO v_value FROM public.system_settings WHERE setting_key = p_key;
  RETURN v_value;
END;
$$;

-- disable_user
CREATE OR REPLACE FUNCTION public.disable_user(
  p_user_id UUID,
  p_disabled_by UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_permission(p_disabled_by, 'users', 'update') THEN
    INSERT INTO public.audit_logs (user_id, action, resource, status, reason)
    VALUES (p_disabled_by, 'disable_user', 'users', 'denied', 'Sem permissão');
    RETURN FALSE;
  END IF;

  UPDATE public.user_roles
  SET is_active = FALSE, deactivated_at = NOW(), deactivated_by = p_disabled_by
  WHERE user_id = p_user_id AND is_active = TRUE;

  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status)
  VALUES (p_disabled_by, 'disable_user', 'users', p_user_id, 'success');

  RETURN TRUE;
END;
$$;

-- =============================================
-- SEED: New permissions for admin panel
-- =============================================
INSERT INTO public.permissions (resource, action, description, category, is_system)
VALUES
  ('system_settings', 'read', 'Permite visualizar configurações do sistema.', 'system', TRUE),
  ('system_settings', 'update', 'Permite atualizar configurações do sistema.', 'system', TRUE),
  ('system_notifications', 'create', 'Permite criar notificações do sistema.', 'communication', TRUE),
  ('system_notifications', 'read', 'Permite visualizar notificações do sistema.', 'communication', TRUE),
  ('users', 'export', 'Permite exportar dados de usuários.', 'user_management', TRUE)
ON CONFLICT (resource, action) DO NOTHING;

-- Grant new permissions to Admin role
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r, public.permissions p
WHERE r.name = 'Admin'
  AND (p.resource, p.action) IN (
    ('system_settings', 'read'),
    ('system_settings', 'update'),
    ('system_notifications', 'create'),
    ('system_notifications', 'read'),
    ('users', 'export')
  )
ON CONFLICT (role_id, permission_id) DO NOTHING;
