CREATE TABLE public.contact_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest_topic TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'site',
  status TEXT NOT NULL DEFAULT 'new',
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_error TEXT
);

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_contact_leads_created_at ON public.contact_leads (created_at DESC);
CREATE INDEX idx_contact_leads_status ON public.contact_leads (status);