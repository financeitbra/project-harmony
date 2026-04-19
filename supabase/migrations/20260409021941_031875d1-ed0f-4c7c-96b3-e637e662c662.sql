CREATE OR REPLACE FUNCTION public.update_client(
  p_client_id UUID,
  p_name TEXT,
  p_description TEXT DEFAULT NULL,
  p_color TEXT DEFAULT '#2198b6',
  p_is_active BOOLEAN DEFAULT TRUE,
  p_updated_by UUID DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_old_values JSONB;
BEGIN
  -- Permission check
  IF NOT public.has_permission(COALESCE(p_updated_by, auth.uid()), 'clients', 'manage') THEN
    INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status, reason)
    VALUES (COALESCE(p_updated_by, auth.uid()), 'update_client', 'clients', p_client_id, 'denied', 'Sem permissão para gerenciar clientes');
    RAISE EXCEPTION 'Permissão negada para gerenciar clientes.';
  END IF;

  -- Validate name
  IF TRIM(p_name) = '' OR p_name IS NULL THEN
    RAISE EXCEPTION 'Nome do cliente é obrigatório.';
  END IF;

  -- Check client exists
  IF NOT EXISTS (SELECT 1 FROM public.clients WHERE id = p_client_id) THEN
    RAISE EXCEPTION 'Cliente não encontrado.';
  END IF;

  -- Capture old values
  SELECT jsonb_build_object('name', name, 'description', description, 'color', color, 'is_active', is_active)
  INTO v_old_values FROM public.clients WHERE id = p_client_id;

  -- Update
  UPDATE public.clients
  SET name = TRIM(p_name), description = p_description, color = p_color, is_active = p_is_active, updated_at = NOW()
  WHERE id = p_client_id;

  -- Audit
  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status, old_values, new_values)
  VALUES (COALESCE(p_updated_by, auth.uid()), 'update_client', 'clients', p_client_id, 'success',
    v_old_values, jsonb_build_object('name', p_name, 'description', p_description, 'color', p_color, 'is_active', p_is_active));

  RETURN TRUE;
END;
$$;

-- Also create a function to add clients
CREATE OR REPLACE FUNCTION public.create_client(
  p_name TEXT,
  p_description TEXT DEFAULT NULL,
  p_color TEXT DEFAULT '#2198b6',
  p_created_by UUID DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_client_id UUID;
BEGIN
  IF NOT public.has_permission(COALESCE(p_created_by, auth.uid()), 'clients', 'manage') THEN
    RAISE EXCEPTION 'Permissão negada para gerenciar clientes.';
  END IF;

  IF TRIM(p_name) = '' OR p_name IS NULL THEN
    RAISE EXCEPTION 'Nome do cliente é obrigatório.';
  END IF;

  INSERT INTO public.clients (name, description, color)
  VALUES (TRIM(p_name), p_description, p_color)
  RETURNING id INTO v_client_id;

  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status, new_values)
  VALUES (COALESCE(p_created_by, auth.uid()), 'create_client', 'clients', v_client_id, 'success',
    jsonb_build_object('name', p_name, 'description', p_description, 'color', p_color));

  RETURN v_client_id;
END;
$$;