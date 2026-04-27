import { supabase } from "@/integrations/supabase/client";

export const logAction = async (action: string, metadata: any = {}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('audit_logs').insert({
    user_id: user.id,
    action,
    metadata: {
      ...metadata,
      url: window.location.href,
      userAgent: navigator.userAgent
    }
  });
};
