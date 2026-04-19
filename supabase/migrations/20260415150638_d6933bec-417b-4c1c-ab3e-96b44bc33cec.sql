
-- Drop views first
DROP VIEW IF EXISTS public.public_jobs CASCADE;

-- Drop all tables (order matters due to foreign keys)
DROP TABLE IF EXISTS public.ai_readiness_responses CASCADE;
DROP TABLE IF EXISTS public.ai_readiness_assessments CASCADE;
DROP TABLE IF EXISTS public.ai_readiness_metrics CASCADE;
DROP TABLE IF EXISTS public.job_audit_log CASCADE;
DROP TABLE IF EXISTS public.job_applications CASCADE;
DROP TABLE IF EXISTS public.job_candidates CASCADE;
DROP TABLE IF EXISTS public.job_history CASCADE;
DROP TABLE IF EXISTS public.job_notifications CASCADE;
DROP TABLE IF EXISTS public.jobs CASCADE;
DROP TABLE IF EXISTS public.time_entry_approvals CASCADE;
DROP TABLE IF EXISTS public.time_entries CASCADE;
DROP TABLE IF EXISTS public.user_activities CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.role_permissions CASCADE;
DROP TABLE IF EXISTS public.permissions CASCADE;
DROP TABLE IF EXISTS public.roles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.clients CASCADE;
DROP TABLE IF EXISTS public.contact_leads CASCADE;
DROP TABLE IF EXISTS public.internal_invites CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.system_notifications CASCADE;
DROP TABLE IF EXISTS public.system_settings CASCADE;

-- Drop all functions
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role) CASCADE;
DROP FUNCTION IF EXISTS public.has_permission(uuid, text, text) CASCADE;
DROP FUNCTION IF EXISTS public.get_user_permissions(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.get_own_portal_type(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.prevent_portal_type_change() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.validate_approval_status() CASCADE;
DROP FUNCTION IF EXISTS public.validate_time_entry_status() CASCADE;
DROP FUNCTION IF EXISTS public.update_time_entries_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.update_jobs_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.generate_job_code() CASCADE;
DROP FUNCTION IF EXISTS public.set_job_code() CASCADE;
DROP FUNCTION IF EXISTS public.create_job(text, text, text, text, text, text, numeric, numeric, uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.update_job(uuid, text, text, text, text, text, text, numeric, numeric, uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.close_job(uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.update_candidate_status(uuid, text, text, text) CASCADE;
DROP FUNCTION IF EXISTS public.create_client(text, text, text, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.update_client(uuid, text, text, text, boolean, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.create_role(text, text, text, text, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.update_role(uuid, text, text, text, text, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.delete_role(uuid, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.assign_role_to_user(uuid, uuid, uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.revoke_role_from_user(uuid, uuid, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.assign_permission_to_role(uuid, uuid, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.revoke_permission_from_role(uuid, uuid, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.disable_user(uuid, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.get_all_roles_with_permissions() CASCADE;
DROP FUNCTION IF EXISTS public.get_users_with_roles() CASCADE;
DROP FUNCTION IF EXISTS public.get_system_statistics() CASCADE;
DROP FUNCTION IF EXISTS public.get_system_setting(text) CASCADE;
DROP FUNCTION IF EXISTS public.update_system_setting(text, jsonb, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.validate_and_save_time_entry(uuid, uuid, date, time, time, text, uuid, uuid, time, time, text) CASCADE;
DROP FUNCTION IF EXISTS public.delete_time_entry(uuid, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.calculate_monthly_summary(uuid, integer, integer) CASCADE;

-- Drop enum type
DROP TYPE IF EXISTS public.app_role CASCADE;
