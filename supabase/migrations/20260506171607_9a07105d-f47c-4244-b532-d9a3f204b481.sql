-- Drop existing policies to ensure a clean state
DO $$ 
BEGIN
    -- profiles
    DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Admins can do everything" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
    
    -- audit_logs
    DROP POLICY IF EXISTS "Users can view their own logs" ON public.audit_logs;
    DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
    DROP POLICY IF EXISTS "Users can insert their own logs" ON public.audit_logs;
    
    -- clients
    DROP POLICY IF EXISTS "Admins can manage clients" ON public.clients;
    DROP POLICY IF EXISTS "Users can view clients they are assigned to" ON public.clients;
    
    -- user_clients
    DROP POLICY IF EXISTS "Admins can manage user_clients" ON public.user_clients;
    DROP POLICY IF EXISTS "Users can view their own assignments" ON public.user_clients;
    
    -- time_entries
    DROP POLICY IF EXISTS "Users can manage their own time entries" ON public.time_entries;
    DROP POLICY IF EXISTS "Admins can view all time entries" ON public.time_entries;
END $$;

-- Enable RLS (just in case any were missed, though they seem enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

---------------------------------------------------------------------------
-- PROFILES POLICIES
---------------------------------------------------------------------------

CREATE POLICY "profiles_select_policy" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id OR is_admin());

-- Users can update their own non-sensitive info
CREATE POLICY "profiles_update_user_policy" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (
    auth.uid() = id AND 
    role = (SELECT role FROM public.profiles WHERE id = auth.uid()) AND
    password_reset_required = (SELECT password_reset_required FROM public.profiles WHERE id = auth.uid())
);

-- Admins can update anything
CREATE POLICY "profiles_admin_policy" 
ON public.profiles FOR ALL 
TO authenticated 
USING (is_admin()) 
WITH CHECK (is_admin());

---------------------------------------------------------------------------
-- AUDIT_LOGS POLICIES (Immutable)
---------------------------------------------------------------------------

CREATE POLICY "audit_logs_select_policy" 
ON public.audit_logs FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "audit_logs_insert_policy" 
ON public.audit_logs FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- No UPDATE or DELETE policies for audit_logs ensures immutability

---------------------------------------------------------------------------
-- CLIENTS POLICIES
---------------------------------------------------------------------------

CREATE POLICY "clients_select_policy" 
ON public.clients FOR SELECT 
TO authenticated 
USING (
    is_admin() OR 
    EXISTS (
        SELECT 1 FROM public.user_clients 
        WHERE user_clients.client_id = clients.id 
        AND user_clients.user_id = auth.uid()
    )
);

CREATE POLICY "clients_admin_policy" 
ON public.clients FOR ALL 
TO authenticated 
USING (is_admin()) 
WITH CHECK (is_admin());

---------------------------------------------------------------------------
-- USER_CLIENTS POLICIES
---------------------------------------------------------------------------

CREATE POLICY "user_clients_select_policy" 
ON public.user_clients FOR SELECT 
TO authenticated 
USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "user_clients_admin_policy" 
ON public.user_clients FOR ALL 
TO authenticated 
USING (is_admin()) 
WITH CHECK (is_admin());

---------------------------------------------------------------------------
-- TIME_ENTRIES POLICIES
---------------------------------------------------------------------------

CREATE POLICY "time_entries_select_policy" 
ON public.time_entries FOR SELECT 
TO authenticated 
USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "time_entries_insert_policy" 
ON public.time_entries FOR INSERT 
TO authenticated 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "time_entries_update_policy" 
ON public.time_entries FOR UPDATE 
TO authenticated 
USING (user_id = auth.uid()) 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "time_entries_delete_policy" 
ON public.time_entries FOR DELETE 
TO authenticated 
USING (user_id = auth.uid());

-- Admins can manage all time entries
CREATE POLICY "time_entries_admin_policy" 
ON public.time_entries FOR ALL 
TO authenticated 
USING (is_admin()) 
WITH CHECK (is_admin());
