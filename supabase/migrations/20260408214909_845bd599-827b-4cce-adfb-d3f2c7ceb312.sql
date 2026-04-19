
-- =====================================================
-- STEP 1: Create new tables
-- =====================================================

-- TABELA: roles
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT,
  icon TEXT,
  is_system BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);
CREATE INDEX idx_roles_name ON public.roles(name);

-- TABELA: permissions
CREATE TABLE IF NOT EXISTS public.permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT,
  category TEXT,
  is_system BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_resource_action UNIQUE (resource, action)
);
CREATE INDEX idx_permissions_resource_action ON public.permissions(resource, action);

-- TABELA: role_permissions
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT unique_role_permission UNIQUE (role_id, permission_id)
);
CREATE INDEX idx_role_permissions_role_id ON public.role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission_id ON public.role_permissions(permission_id);

-- TABELA: audit_logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  status TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);
CREATE INDEX idx_audit_logs_resource_action ON public.audit_logs(resource, action);

-- =====================================================
-- STEP 2: Migrate user_roles table
-- =====================================================

-- Drop existing policies on user_roles
DROP POLICY IF EXISTS "Service role full access on user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- Rename old table
ALTER TABLE public.user_roles RENAME TO user_roles_legacy;

-- Create new user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  deactivated_at TIMESTAMPTZ,
  deactivated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT unique_user_role UNIQUE (user_id, role_id)
);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON public.user_roles(role_id);
CREATE INDEX idx_user_roles_is_active ON public.user_roles(is_active);

-- =====================================================
-- STEP 3: Enable RLS on all new tables
-- =====================================================
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 4: Create has_permission function FIRST (needed by policies)
-- =====================================================
CREATE OR REPLACE FUNCTION public.has_permission(
  p_user_id UUID,
  p_resource TEXT,
  p_action TEXT
) RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS(
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role_id = rp.role_id
    JOIN public.permissions p ON rp.permission_id = p.id
    WHERE ur.user_id = p_user_id
      AND ur.is_active = TRUE
      AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
      AND p.resource = p_resource
      AND p.action = p_action
  )
$$;

-- get_user_permissions function
CREATE OR REPLACE FUNCTION public.get_user_permissions(p_user_id UUID)
RETURNS TABLE(resource TEXT, action TEXT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT p.resource, p.action
  FROM public.user_roles ur
  JOIN public.role_permissions rp ON ur.role_id = rp.role_id
  JOIN public.permissions p ON rp.permission_id = p.id
  WHERE ur.user_id = p_user_id
    AND ur.is_active = TRUE
    AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
$$;

-- Update has_role to work with new schema
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    WHERE ur.user_id = _user_id
      AND ur.is_active = TRUE
      AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
      AND r.name = _role::text
  )
$$;

-- =====================================================
-- STEP 5: RLS Policies
-- =====================================================

-- roles policies
CREATE POLICY "Authenticated users can read roles"
  ON public.roles FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Service role full access on roles"
  ON public.roles FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Permission holders can manage roles"
  ON public.roles FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(), 'roles', 'update'))
  WITH CHECK (public.has_permission(auth.uid(), 'roles', 'update'));

-- permissions policies
CREATE POLICY "Authenticated users can read permissions"
  ON public.permissions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Service role full access on permissions"
  ON public.permissions FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Permission holders can manage permissions"
  ON public.permissions FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(), 'roles', 'update'))
  WITH CHECK (public.has_permission(auth.uid(), 'roles', 'update'));

-- role_permissions policies
CREATE POLICY "Authenticated users can read role_permissions"
  ON public.role_permissions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Service role full access on role_permissions"
  ON public.role_permissions FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Permission holders can manage role_permissions"
  ON public.role_permissions FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(), 'roles', 'update'))
  WITH CHECK (public.has_permission(auth.uid(), 'roles', 'update'));

-- user_roles policies
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_permission(auth.uid(), 'users', 'read'));

CREATE POLICY "Permission holders can manage user_roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(), 'users', 'update'))
  WITH CHECK (public.has_permission(auth.uid(), 'users', 'update'));

CREATE POLICY "Service role full access on user_roles"
  ON public.user_roles FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- audit_logs policies
CREATE POLICY "Users can view own audit logs"
  ON public.audit_logs FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_permission(auth.uid(), 'audit_logs', 'read'));

CREATE POLICY "Service role can insert audit logs"
  ON public.audit_logs FOR INSERT TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role full access on audit_logs"
  ON public.audit_logs FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- =====================================================
-- STEP 6: Seed roles
-- =====================================================
INSERT INTO public.roles (name, description, color, icon, is_system) VALUES
  ('admin', 'Administrador com acesso total ao sistema', '#ef4444', 'shield', TRUE),
  ('gerente', 'Gerente com acesso a gestão de equipe e relatórios', '#f59e0b', 'briefcase', TRUE),
  ('recrutador', 'Recrutador com acesso a vagas e candidatos', '#3b82f6', 'users', TRUE),
  ('analista', 'Analista com acesso a dados e relatórios', '#8b5cf6', 'bar-chart-2', TRUE),
  ('operacional', 'Operacional com acesso a tarefas e horas', '#10b981', 'settings', TRUE),
  ('entrevistador', 'Entrevistador com acesso limitado a entrevistas', '#6366f1', 'mic', TRUE);

-- =====================================================
-- STEP 7: Seed permissions (12 resources × 5 actions)
-- =====================================================
INSERT INTO public.permissions (resource, action, description, category, is_system) VALUES
  -- users
  ('users', 'create', 'Criar usuários', 'user_management', TRUE),
  ('users', 'read', 'Ver usuários', 'user_management', TRUE),
  ('users', 'update', 'Atualizar usuários', 'user_management', TRUE),
  ('users', 'delete', 'Deletar usuários', 'user_management', TRUE),
  ('users', 'export', 'Exportar usuários', 'user_management', TRUE),
  -- roles
  ('roles', 'create', 'Criar roles', 'user_management', TRUE),
  ('roles', 'read', 'Ver roles', 'user_management', TRUE),
  ('roles', 'update', 'Atualizar roles', 'user_management', TRUE),
  ('roles', 'delete', 'Deletar roles', 'user_management', TRUE),
  ('roles', 'export', 'Exportar roles', 'user_management', TRUE),
  -- permissions
  ('permissions', 'create', 'Criar permissões', 'user_management', TRUE),
  ('permissions', 'read', 'Ver permissões', 'user_management', TRUE),
  ('permissions', 'update', 'Atualizar permissões', 'user_management', TRUE),
  ('permissions', 'delete', 'Deletar permissões', 'user_management', TRUE),
  ('permissions', 'export', 'Exportar permissões', 'user_management', TRUE),
  -- vagas
  ('vagas', 'create', 'Criar vagas', 'recruitment', TRUE),
  ('vagas', 'read', 'Ver vagas', 'recruitment', TRUE),
  ('vagas', 'update', 'Atualizar vagas', 'recruitment', TRUE),
  ('vagas', 'delete', 'Deletar vagas', 'recruitment', TRUE),
  ('vagas', 'export', 'Exportar vagas', 'recruitment', TRUE),
  -- leads
  ('leads', 'create', 'Criar leads', 'recruitment', TRUE),
  ('leads', 'read', 'Ver leads', 'recruitment', TRUE),
  ('leads', 'update', 'Atualizar leads', 'recruitment', TRUE),
  ('leads', 'delete', 'Deletar leads', 'recruitment', TRUE),
  ('leads', 'export', 'Exportar leads', 'recruitment', TRUE),
  -- entrevistas
  ('entrevistas', 'create', 'Criar entrevistas', 'recruitment', TRUE),
  ('entrevistas', 'read', 'Ver entrevistas', 'recruitment', TRUE),
  ('entrevistas', 'update', 'Atualizar entrevistas', 'recruitment', TRUE),
  ('entrevistas', 'delete', 'Deletar entrevistas', 'recruitment', TRUE),
  ('entrevistas', 'export', 'Exportar entrevistas', 'recruitment', TRUE),
  -- relatorios
  ('relatorios', 'create', 'Criar relatórios', 'analytics', TRUE),
  ('relatorios', 'read', 'Ver relatórios', 'analytics', TRUE),
  ('relatorios', 'update', 'Atualizar relatórios', 'analytics', TRUE),
  ('relatorios', 'delete', 'Deletar relatórios', 'analytics', TRUE),
  ('relatorios', 'export', 'Exportar relatórios', 'analytics', TRUE),
  -- horas
  ('horas', 'create', 'Registrar horas', 'operations', TRUE),
  ('horas', 'read', 'Ver horas', 'operations', TRUE),
  ('horas', 'update', 'Atualizar horas', 'operations', TRUE),
  ('horas', 'delete', 'Deletar horas', 'operations', TRUE),
  ('horas', 'export', 'Exportar horas', 'operations', TRUE),
  -- dashboard
  ('dashboard', 'create', 'Criar dashboards', 'analytics', TRUE),
  ('dashboard', 'read', 'Ver dashboards', 'analytics', TRUE),
  ('dashboard', 'update', 'Atualizar dashboards', 'analytics', TRUE),
  ('dashboard', 'delete', 'Deletar dashboards', 'analytics', TRUE),
  ('dashboard', 'export', 'Exportar dashboards', 'analytics', TRUE),
  -- notificacoes
  ('notificacoes', 'create', 'Criar notificações', 'system', TRUE),
  ('notificacoes', 'read', 'Ver notificações', 'system', TRUE),
  ('notificacoes', 'update', 'Atualizar notificações', 'system', TRUE),
  ('notificacoes', 'delete', 'Deletar notificações', 'system', TRUE),
  ('notificacoes', 'export', 'Exportar notificações', 'system', TRUE),
  -- ia_readiness
  ('ia_readiness', 'create', 'Criar avaliações IA', 'analytics', TRUE),
  ('ia_readiness', 'read', 'Ver avaliações IA', 'analytics', TRUE),
  ('ia_readiness', 'update', 'Atualizar avaliações IA', 'analytics', TRUE),
  ('ia_readiness', 'delete', 'Deletar avaliações IA', 'analytics', TRUE),
  ('ia_readiness', 'export', 'Exportar avaliações IA', 'analytics', TRUE),
  -- audit_logs
  ('audit_logs', 'create', 'Criar logs de auditoria', 'system', TRUE),
  ('audit_logs', 'read', 'Ver logs de auditoria', 'system', TRUE),
  ('audit_logs', 'update', 'Atualizar logs de auditoria', 'system', TRUE),
  ('audit_logs', 'delete', 'Deletar logs de auditoria', 'system', TRUE),
  ('audit_logs', 'export', 'Exportar logs de auditoria', 'system', TRUE);

-- =====================================================
-- STEP 8: Assign ALL permissions to Admin role
-- =====================================================
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'admin';

-- Gerente: users:read, roles:read, vagas:*, leads:*, relatorios:*, horas:*, dashboard:*, ia_readiness:read
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'gerente'
  AND (
    (p.resource = 'users' AND p.action = 'read')
    OR (p.resource = 'roles' AND p.action = 'read')
    OR (p.resource IN ('vagas', 'leads', 'relatorios', 'horas', 'dashboard'))
    OR (p.resource = 'ia_readiness' AND p.action = 'read')
    OR (p.resource = 'notificacoes' AND p.action IN ('read', 'create'))
  );

-- Recrutador: vagas:*, leads:*, entrevistas:*, notificacoes:read
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'recrutador'
  AND (
    p.resource IN ('vagas', 'leads', 'entrevistas')
    OR (p.resource = 'notificacoes' AND p.action = 'read')
    OR (p.resource = 'dashboard' AND p.action = 'read')
  );

-- Analista: relatorios:*, dashboard:*, ia_readiness:*, leads:read
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'analista'
  AND (
    p.resource IN ('relatorios', 'dashboard', 'ia_readiness')
    OR (p.resource = 'leads' AND p.action = 'read')
    OR (p.resource = 'notificacoes' AND p.action = 'read')
  );

-- Operacional: horas:*, notificacoes:read, dashboard:read
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'operacional'
  AND (
    p.resource = 'horas'
    OR (p.resource IN ('notificacoes', 'dashboard') AND p.action = 'read')
  );

-- Entrevistador: entrevistas:read/update, notificacoes:read
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'entrevistador'
  AND (
    (p.resource = 'entrevistas' AND p.action IN ('read', 'update'))
    OR (p.resource = 'notificacoes' AND p.action = 'read')
  );

-- =====================================================
-- STEP 9: Migrate legacy user_roles data
-- =====================================================
INSERT INTO public.user_roles (user_id, role_id, is_active)
SELECT ul.user_id, r.id, TRUE
FROM public.user_roles_legacy ul
JOIN public.roles r ON r.name = ul.role::text
ON CONFLICT (user_id, role_id) DO NOTHING;

-- Drop legacy table
DROP TABLE public.user_roles_legacy;

-- Drop the old enum type if no longer needed (keep for backward compat with has_role signature)
