
-- FUNCTION: assign_role_to_user
CREATE OR REPLACE FUNCTION public.assign_role_to_user(
  p_user_id UUID,
  p_role_id UUID,
  p_assigned_by UUID,
  p_notes TEXT DEFAULT NULL
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_has_permission BOOLEAN;
BEGIN
  SELECT public.has_permission(p_assigned_by, 'users', 'update') INTO v_has_permission;
  IF NOT v_has_permission THEN
    INSERT INTO public.audit_logs (user_id, action, resource, status, reason)
    VALUES (p_assigned_by, 'assign_role', 'users', 'denied', 'Sem permissão para atribuir roles');
    RETURN FALSE;
  END IF;

  INSERT INTO public.user_roles (user_id, role_id, assigned_by, notes, is_active, deactivated_at, deactivated_by)
  VALUES (p_user_id, p_role_id, p_assigned_by, p_notes, TRUE, NULL, NULL)
  ON CONFLICT (user_id, role_id) DO UPDATE SET
    assigned_by = EXCLUDED.assigned_by,
    assigned_at = NOW(),
    notes = EXCLUDED.notes,
    is_active = TRUE,
    deactivated_at = NULL,
    deactivated_by = NULL;

  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status, new_values)
  VALUES (p_assigned_by, 'assign_role', 'users', p_user_id, 'success',
    jsonb_build_object('role_id', p_role_id, 'user_id', p_user_id));

  RETURN TRUE;
END;
$$;

-- FUNCTION: revoke_role_from_user
CREATE OR REPLACE FUNCTION public.revoke_role_from_user(
  p_user_id UUID,
  p_role_id UUID,
  p_revoked_by UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_has_permission BOOLEAN;
BEGIN
  SELECT public.has_permission(p_revoked_by, 'users', 'update') INTO v_has_permission;
  IF NOT v_has_permission THEN
    INSERT INTO public.audit_logs (user_id, action, resource, status, reason)
    VALUES (p_revoked_by, 'revoke_role', 'users', 'denied', 'Sem permissão para revogar roles');
    RETURN FALSE;
  END IF;

  UPDATE public.user_roles
  SET is_active = FALSE, deactivated_at = NOW(), deactivated_by = p_revoked_by
  WHERE user_id = p_user_id AND role_id = p_role_id AND is_active = TRUE;

  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status, old_values, new_values)
  VALUES (p_revoked_by, 'revoke_role', 'users', p_user_id, 'success',
    jsonb_build_object('role_id', p_role_id, 'is_active', TRUE),
    jsonb_build_object('role_id', p_role_id, 'is_active', FALSE));

  RETURN TRUE;
END;
$$;

-- FUNCTION: create_role
CREATE OR REPLACE FUNCTION public.create_role(
  p_name TEXT,
  p_description TEXT,
  p_color TEXT,
  p_icon TEXT,
  p_created_by UUID
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role_id UUID;
  v_has_permission BOOLEAN;
BEGIN
  SELECT public.has_permission(p_created_by, 'roles', 'create') INTO v_has_permission;
  IF NOT v_has_permission THEN
    INSERT INTO public.audit_logs (user_id, action, resource, status, reason)
    VALUES (p_created_by, 'create_role', 'roles', 'denied', 'Sem permissão para criar roles');
    RETURN NULL;
  END IF;

  INSERT INTO public.roles (name, description, color, icon, created_by)
  VALUES (p_name, p_description, p_color, p_icon, p_created_by)
  RETURNING id INTO v_role_id;

  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status, new_values)
  VALUES (p_created_by, 'create_role', 'roles', v_role_id, 'success',
    jsonb_build_object('name', p_name, 'description', p_description));

  RETURN v_role_id;
END;
$$;

-- FUNCTION: update_role
CREATE OR REPLACE FUNCTION public.update_role(
  p_role_id UUID,
  p_name TEXT,
  p_description TEXT,
  p_color TEXT,
  p_icon TEXT,
  p_updated_by UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_has_permission BOOLEAN;
  v_old_values JSONB;
  v_new_values JSONB;
BEGIN
  SELECT public.has_permission(p_updated_by, 'roles', 'update') INTO v_has_permission;
  IF NOT v_has_permission THEN
    INSERT INTO public.audit_logs (user_id, action, resource, status, reason)
    VALUES (p_updated_by, 'update_role', 'roles', 'denied', 'Sem permissão para atualizar roles');
    RETURN FALSE;
  END IF;

  SELECT jsonb_build_object('name', name, 'description', description, 'color', color, 'icon', icon)
  INTO v_old_values FROM public.roles WHERE id = p_role_id;

  UPDATE public.roles
  SET name = p_name, description = p_description, color = p_color, icon = p_icon, updated_at = NOW()
  WHERE id = p_role_id;

  v_new_values := jsonb_build_object('name', p_name, 'description', p_description, 'color', p_color, 'icon', p_icon);

  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status, old_values, new_values)
  VALUES (p_updated_by, 'update_role', 'roles', p_role_id, 'success', v_old_values, v_new_values);

  RETURN TRUE;
END;
$$;

-- FUNCTION: delete_role
CREATE OR REPLACE FUNCTION public.delete_role(
  p_role_id UUID,
  p_deleted_by UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_has_permission BOOLEAN;
  v_is_system BOOLEAN;
  v_role_name TEXT;
BEGIN
  SELECT public.has_permission(p_deleted_by, 'roles', 'delete') INTO v_has_permission;
  IF NOT v_has_permission THEN
    INSERT INTO public.audit_logs (user_id, action, resource, status, reason)
    VALUES (p_deleted_by, 'delete_role', 'roles', 'denied', 'Sem permissão para deletar roles');
    RETURN FALSE;
  END IF;

  SELECT is_system, name FROM public.roles WHERE id = p_role_id INTO v_is_system, v_role_name;
  IF v_is_system THEN
    INSERT INTO public.audit_logs (user_id, action, resource, status, reason)
    VALUES (p_deleted_by, 'delete_role', 'roles', 'denied', 'Não é permitido deletar roles de sistema');
    RETURN FALSE;
  END IF;

  DELETE FROM public.roles WHERE id = p_role_id;

  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status, old_values)
  VALUES (p_deleted_by, 'delete_role', 'roles', p_role_id, 'success',
    jsonb_build_object('id', p_role_id, 'name', v_role_name));

  RETURN TRUE;
END;
$$;

-- FUNCTION: assign_permission_to_role
CREATE OR REPLACE FUNCTION public.assign_permission_to_role(
  p_role_id UUID,
  p_permission_id UUID,
  p_assigned_by UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_has_permission BOOLEAN;
BEGIN
  SELECT public.has_permission(p_assigned_by, 'roles', 'update') INTO v_has_permission;
  IF NOT v_has_permission THEN
    INSERT INTO public.audit_logs (user_id, action, resource, status, reason)
    VALUES (p_assigned_by, 'assign_permission_to_role', 'roles', 'denied', 'Sem permissão');
    RETURN FALSE;
  END IF;

  INSERT INTO public.role_permissions (role_id, permission_id, created_by)
  VALUES (p_role_id, p_permission_id, p_assigned_by)
  ON CONFLICT (role_id, permission_id) DO NOTHING;

  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status, new_values)
  VALUES (p_assigned_by, 'assign_permission_to_role', 'roles', p_role_id, 'success',
    jsonb_build_object('permission_id', p_permission_id));

  RETURN TRUE;
END;
$$;

-- FUNCTION: revoke_permission_from_role
CREATE OR REPLACE FUNCTION public.revoke_permission_from_role(
  p_role_id UUID,
  p_permission_id UUID,
  p_revoked_by UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_has_permission BOOLEAN;
BEGIN
  SELECT public.has_permission(p_revoked_by, 'roles', 'update') INTO v_has_permission;
  IF NOT v_has_permission THEN
    INSERT INTO public.audit_logs (user_id, action, resource, status, reason)
    VALUES (p_revoked_by, 'revoke_permission_from_role', 'roles', 'denied', 'Sem permissão');
    RETURN FALSE;
  END IF;

  DELETE FROM public.role_permissions
  WHERE role_id = p_role_id AND permission_id = p_permission_id;

  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status, old_values)
  VALUES (p_revoked_by, 'revoke_permission_from_role', 'roles', p_role_id, 'success',
    jsonb_build_object('permission_id', p_permission_id));

  RETURN TRUE;
END;
$$;
