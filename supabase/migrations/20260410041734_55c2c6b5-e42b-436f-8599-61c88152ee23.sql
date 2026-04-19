-- Fix 1: Prevent privilege escalation in user_roles
-- Drop the existing overly permissive ALL policy
DROP POLICY IF EXISTS "Permission holders can manage user_roles" ON public.user_roles;

-- Create separate policies for INSERT, UPDATE, DELETE with self-assignment prevention
CREATE POLICY "Permission holders can view user_roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (
  (user_id = auth.uid()) OR has_permission(auth.uid(), 'users'::text, 'read'::text) OR has_permission(auth.uid(), 'users'::text, 'update'::text)
);

CREATE POLICY "Permission holders can insert user_roles for others"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (
  has_permission(auth.uid(), 'users'::text, 'update'::text)
  AND user_id != auth.uid()
);

CREATE POLICY "Permission holders can update user_roles for others"
ON public.user_roles FOR UPDATE
TO authenticated
USING (
  has_permission(auth.uid(), 'users'::text, 'update'::text)
  AND user_id != auth.uid()
)
WITH CHECK (
  has_permission(auth.uid(), 'users'::text, 'update'::text)
  AND user_id != auth.uid()
);

CREATE POLICY "Permission holders can delete user_roles for others"
ON public.user_roles FOR DELETE
TO authenticated
USING (
  has_permission(auth.uid(), 'users'::text, 'update'::text)
  AND user_id != auth.uid()
);

-- Also drop the existing SELECT policy to avoid conflict (we included SELECT above)
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- Fix 2: Change job_applications UPDATE policy from public to authenticated
DROP POLICY IF EXISTS "Users with permission can update applications" ON public.job_applications;

CREATE POLICY "Users with permission can update applications"
ON public.job_applications FOR UPDATE
TO authenticated
USING (
  (job_id IN (SELECT jobs.id FROM jobs WHERE jobs.responsible_user_id = auth.uid() OR jobs.created_by = auth.uid()))
  OR has_permission(auth.uid(), 'jobs'::text, 'update'::text)
)
WITH CHECK (
  (job_id IN (SELECT jobs.id FROM jobs WHERE jobs.responsible_user_id = auth.uid() OR jobs.created_by = auth.uid()))
  OR has_permission(auth.uid(), 'jobs'::text, 'update'::text)
);