-- Fix system_notifications policies: change from public to authenticated
DROP POLICY IF EXISTS "Admins can create system notifications" ON public.system_notifications;
CREATE POLICY "Admins can create system notifications" ON public.system_notifications
FOR INSERT TO authenticated
WITH CHECK (has_permission(auth.uid(), 'system_notifications', 'create'));

DROP POLICY IF EXISTS "Users can update own notifications" ON public.system_notifications;
CREATE POLICY "Users can update own notifications" ON public.system_notifications
FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own notifications" ON public.system_notifications;
CREATE POLICY "Users can view own notifications" ON public.system_notifications
FOR SELECT TO authenticated
USING ((auth.uid() = user_id) OR (user_id IS NULL));

-- Fix user_activities policy: change from public to authenticated
DROP POLICY IF EXISTS "Users can view own activities or if permitted" ON public.user_activities;
CREATE POLICY "Users can view own activities or if permitted" ON public.user_activities
FOR SELECT TO authenticated
USING ((auth.uid() = user_id) OR has_permission(auth.uid(), 'audit_logs', 'read'));

-- Fix system_settings policies: change from public to authenticated
DROP POLICY IF EXISTS "Admins can read system settings" ON public.system_settings;
CREATE POLICY "Admins can read system settings" ON public.system_settings
FOR SELECT TO authenticated
USING (has_permission(auth.uid(), 'system_settings', 'read'));

DROP POLICY IF EXISTS "Admins can update system settings" ON public.system_settings;
CREATE POLICY "Admins can update system settings" ON public.system_settings
FOR ALL TO authenticated
USING (has_permission(auth.uid(), 'system_settings', 'update'))
WITH CHECK (has_permission(auth.uid(), 'system_settings', 'update'));