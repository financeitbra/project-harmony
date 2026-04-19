
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS requester_name TEXT,
ADD COLUMN IF NOT EXISTS requester_email TEXT,
ADD COLUMN IF NOT EXISTS requester_phone TEXT,
ADD COLUMN IF NOT EXISTS requester_company TEXT;

COMMENT ON COLUMN public.jobs.requester_name IS 'Nome do solicitante da vaga';
COMMENT ON COLUMN public.jobs.requester_email IS 'E-mail do solicitante da vaga';
COMMENT ON COLUMN public.jobs.requester_phone IS 'Telefone do solicitante da vaga';
COMMENT ON COLUMN public.jobs.requester_company IS 'Empresa do solicitante da vaga';
