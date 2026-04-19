
-- =============================================
-- TABLE: clients
-- =============================================
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#2198b6',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clients_name ON public.clients(name);
CREATE INDEX IF NOT EXISTS idx_clients_is_active ON public.clients(is_active);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- All authenticated users can see active clients
CREATE POLICY "All users see active clients" ON public.clients
  FOR SELECT TO authenticated USING (is_active = TRUE);

-- Admins/managers can manage clients
CREATE POLICY "Permission holders manage clients" ON public.clients
  FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(), 'clients', 'manage'))
  WITH CHECK (public.has_permission(auth.uid(), 'clients', 'manage'));

-- Service role full access
CREATE POLICY "Service role full access on clients" ON public.clients
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =============================================
-- TABLE: time_entries
-- =============================================
CREATE TABLE IF NOT EXISTS public.time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE RESTRICT,
  work_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  hours_worked NUMERIC(5,2) GENERATED ALWAYS AS (
    EXTRACT(EPOCH FROM (end_time - start_time)) / 3600.0
  ) STORED,
  activity TEXT NOT NULL,
  overtime_start TIME,
  overtime_end TIME,
  overtime_hours NUMERIC(5,2) GENERATED ALWAYS AS (
    CASE
      WHEN overtime_start IS NOT NULL AND overtime_end IS NOT NULL
      THEN EXTRACT(EPOCH FROM (overtime_end - overtime_start)) / 3600.0
      ELSE 0.0
    END
  ) STORED,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Validation trigger instead of CHECK constraint for status
CREATE OR REPLACE FUNCTION public.validate_time_entry_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status NOT IN ('draft', 'submitted', 'approved') THEN
    RAISE EXCEPTION 'Invalid status: %. Must be draft, submitted, or approved.', NEW.status;
  END IF;
  IF NEW.end_time <= NEW.start_time THEN
    RAISE EXCEPTION 'end_time must be greater than start_time';
  END IF;
  IF NEW.overtime_start IS NOT NULL AND NEW.overtime_end IS NOT NULL AND NEW.overtime_end <= NEW.overtime_start THEN
    RAISE EXCEPTION 'overtime_end must be greater than overtime_start';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_validate_time_entry
  BEFORE INSERT OR UPDATE ON public.time_entries
  FOR EACH ROW EXECUTE FUNCTION public.validate_time_entry_status();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_time_entries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_time_entries_updated_at
  BEFORE UPDATE ON public.time_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_time_entries_updated_at();

CREATE INDEX IF NOT EXISTS idx_time_entries_user_id ON public.time_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_client_id ON public.time_entries(client_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_work_date ON public.time_entries(work_date);
CREATE INDEX IF NOT EXISTS idx_time_entries_user_date ON public.time_entries(user_id, work_date);
CREATE INDEX IF NOT EXISTS idx_time_entries_user_client_date ON public.time_entries(user_id, client_id, work_date);
CREATE INDEX IF NOT EXISTS idx_time_entries_status ON public.time_entries(status);

ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own time entries or all if permitted" ON public.time_entries
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_permission(auth.uid(), 'time_entries', 'read_all'));

CREATE POLICY "Users create own time entries or for others if permitted" ON public.time_entries
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id OR public.has_permission(auth.uid(), 'time_entries', 'create_for_others'));

CREATE POLICY "Users update own time entries or all if permitted" ON public.time_entries
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id OR public.has_permission(auth.uid(), 'time_entries', 'update_all'));

CREATE POLICY "Users delete own time entries or all if permitted" ON public.time_entries
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id OR public.has_permission(auth.uid(), 'time_entries', 'delete_all'));

CREATE POLICY "Service role full access on time_entries" ON public.time_entries
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =============================================
-- TABLE: time_entry_approvals
-- =============================================
CREATE TABLE IF NOT EXISTS public.time_entry_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  time_entry_id UUID NOT NULL REFERENCES public.time_entries(id) ON DELETE CASCADE,
  approved_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  comments TEXT,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Validation trigger for approval status
CREATE OR REPLACE FUNCTION public.validate_approval_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status NOT IN ('pending', 'approved', 'rejected') THEN
    RAISE EXCEPTION 'Invalid approval status: %. Must be pending, approved, or rejected.', NEW.status;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_validate_approval_status
  BEFORE INSERT OR UPDATE ON public.time_entry_approvals
  FOR EACH ROW EXECUTE FUNCTION public.validate_approval_status();

CREATE INDEX IF NOT EXISTS idx_time_entry_approvals_time_entry_id ON public.time_entry_approvals(time_entry_id);
CREATE INDEX IF NOT EXISTS idx_time_entry_approvals_approved_by ON public.time_entry_approvals(approved_by);
CREATE INDEX IF NOT EXISTS idx_time_entry_approvals_status ON public.time_entry_approvals(status);

ALTER TABLE public.time_entry_approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approvers manage time entry approvals" ON public.time_entry_approvals
  FOR ALL TO authenticated
  USING (public.has_permission(auth.uid(), 'time_entries', 'approve'))
  WITH CHECK (public.has_permission(auth.uid(), 'time_entries', 'approve'));

CREATE POLICY "Service role full access on time_entry_approvals" ON public.time_entry_approvals
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =============================================
-- FUNCTIONS
-- =============================================

-- calculate_monthly_summary
CREATE OR REPLACE FUNCTION public.calculate_monthly_summary(
  p_user_id UUID,
  p_year INT,
  p_month INT
)
RETURNS TABLE (
  client_id UUID,
  client_name TEXT,
  total_hours NUMERIC,
  total_overtime NUMERIC,
  entry_count INT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id AS client_id,
    c.name AS client_name,
    COALESCE(SUM(te.hours_worked), 0)::NUMERIC AS total_hours,
    COALESCE(SUM(te.overtime_hours), 0)::NUMERIC AS total_overtime,
    COUNT(te.id)::INT AS entry_count
  FROM public.time_entries te
  JOIN public.clients c ON te.client_id = c.id
  WHERE te.user_id = p_user_id
    AND EXTRACT(YEAR FROM te.work_date) = p_year
    AND EXTRACT(MONTH FROM te.work_date) = p_month
  GROUP BY c.id, c.name
  ORDER BY c.name;
END;
$$;

-- validate_and_save_time_entry
CREATE OR REPLACE FUNCTION public.validate_and_save_time_entry(
  p_user_id UUID,
  p_client_id UUID,
  p_work_date DATE,
  p_start_time TIME,
  p_end_time TIME,
  p_activity TEXT,
  p_current_user_id UUID,
  p_entry_id UUID DEFAULT NULL,
  p_overtime_start TIME DEFAULT NULL,
  p_overtime_end TIME DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_entry_id UUID;
  v_action TEXT;
  v_changes JSONB;
BEGIN
  -- 1. Permission check
  IF p_entry_id IS NULL THEN
    IF p_user_id != p_current_user_id AND NOT public.has_permission(p_current_user_id, 'time_entries', 'create_for_others') THEN
      RAISE EXCEPTION 'Permissão negada para criar registros para outros usuários.';
    END IF;
    v_action := 'create_time_entry';
  ELSE
    IF NOT EXISTS (SELECT 1 FROM public.time_entries WHERE id = p_entry_id) THEN
      RAISE EXCEPTION 'Registro de horas não encontrado.';
    END IF;
    IF (SELECT user_id FROM public.time_entries WHERE id = p_entry_id) != p_current_user_id
       AND NOT public.has_permission(p_current_user_id, 'time_entries', 'update_all') THEN
      RAISE EXCEPTION 'Permissão negada para atualizar registros de outros usuários.';
    END IF;
    v_action := 'update_time_entry';
  END IF;

  -- 2. Business validations
  IF p_end_time <= p_start_time THEN
    RAISE EXCEPTION 'Hora de fim deve ser maior que hora de início.';
  END IF;

  IF p_overtime_start IS NOT NULL AND p_overtime_end IS NOT NULL THEN
    IF p_overtime_end <= p_overtime_start THEN
      RAISE EXCEPTION 'Hora extra final deve ser maior que hora extra inicial.';
    END IF;
  END IF;

  IF p_work_date > CURRENT_DATE THEN
    RAISE EXCEPTION 'Data do trabalho não pode ser no futuro.';
  END IF;

  IF LENGTH(TRIM(p_activity)) < 10 THEN
    RAISE EXCEPTION 'Atividade deve ter no mínimo 10 caracteres.';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.clients WHERE id = p_client_id AND is_active = TRUE) THEN
    RAISE EXCEPTION 'Cliente não encontrado ou inativo.';
  END IF;

  -- 3. Overlap check for new entries
  IF p_entry_id IS NULL THEN
    IF EXISTS (
      SELECT 1 FROM public.time_entries
      WHERE user_id = p_user_id
        AND client_id = p_client_id
        AND work_date = p_work_date
        AND (p_start_time < end_time AND p_end_time > start_time)
    ) THEN
      RAISE EXCEPTION 'Já existe um registro de horas que se sobrepõe ao período informado.';
    END IF;
  END IF;

  -- 4. Save/Update
  IF p_entry_id IS NULL THEN
    INSERT INTO public.time_entries (user_id, client_id, work_date, start_time, end_time, activity, overtime_start, overtime_end, notes, created_by)
    VALUES (p_user_id, p_client_id, p_work_date, p_start_time, p_end_time, p_activity, p_overtime_start, p_overtime_end, p_notes, p_current_user_id)
    RETURNING id INTO v_entry_id;
  ELSE
    UPDATE public.time_entries
    SET client_id = p_client_id, work_date = p_work_date, start_time = p_start_time, end_time = p_end_time,
        activity = p_activity, overtime_start = p_overtime_start, overtime_end = p_overtime_end, notes = p_notes
    WHERE id = p_entry_id
    RETURNING id INTO v_entry_id;
  END IF;

  -- 5. Audit log
  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status, new_values)
  VALUES (p_current_user_id, v_action, 'time_entry', v_entry_id, 'success',
    jsonb_build_object('client_id', p_client_id, 'work_date', p_work_date, 'activity', p_activity));

  RETURN v_entry_id;
END;
$$;

-- delete_time_entry
CREATE OR REPLACE FUNCTION public.delete_time_entry(
  p_entry_id UUID,
  p_current_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_owner_id UUID;
BEGIN
  SELECT user_id INTO v_owner_id FROM public.time_entries WHERE id = p_entry_id;

  IF v_owner_id IS NULL THEN
    RAISE EXCEPTION 'Registro de horas não encontrado.';
  END IF;

  IF v_owner_id != p_current_user_id AND NOT public.has_permission(p_current_user_id, 'time_entries', 'delete_all') THEN
    RAISE EXCEPTION 'Permissão negada para deletar registros de outros usuários.';
  END IF;

  DELETE FROM public.time_entries WHERE id = p_entry_id;

  INSERT INTO public.audit_logs (user_id, action, resource, resource_id, status)
  VALUES (p_current_user_id, 'delete_time_entry', 'time_entry', p_entry_id, 'success');

  RETURN TRUE;
END;
$$;

-- =============================================
-- PERMISSIONS (seed data)
-- =============================================
INSERT INTO public.permissions (resource, action, description, category, is_system) VALUES
  ('time_entries', 'create', 'Criar registros de horas próprios', 'Registro de Horas', true),
  ('time_entries', 'read', 'Ver registros de horas próprios', 'Registro de Horas', true),
  ('time_entries', 'update', 'Editar registros de horas próprios', 'Registro de Horas', true),
  ('time_entries', 'delete', 'Deletar registros de horas próprios', 'Registro de Horas', true),
  ('time_entries', 'read_all', 'Ver registros de horas de todos', 'Registro de Horas', true),
  ('time_entries', 'update_all', 'Editar registros de horas de todos', 'Registro de Horas', true),
  ('time_entries', 'delete_all', 'Deletar registros de horas de todos', 'Registro de Horas', true),
  ('time_entries', 'create_for_others', 'Criar registros para outros usuários', 'Registro de Horas', true),
  ('time_entries', 'approve', 'Aprovar registros de horas', 'Registro de Horas', true),
  ('clients', 'read', 'Ver clientes', 'Clientes', true),
  ('clients', 'manage', 'Gerenciar clientes (criar, editar, deletar)', 'Clientes', true)
ON CONFLICT DO NOTHING;
