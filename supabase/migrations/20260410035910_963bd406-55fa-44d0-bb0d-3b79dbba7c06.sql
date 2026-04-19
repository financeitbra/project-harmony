
-- Add missing columns for info request and cancellation flows
ALTER TABLE public.jobs
ADD COLUMN IF NOT EXISTS info_requested_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS info_requested_by UUID,
ADD COLUMN IF NOT EXISTS info_request_details TEXT,
ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS cancelled_by UUID,
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;

-- Add comments
COMMENT ON COLUMN public.jobs.info_requested_at IS 'Data e hora da solicitação de informações';
COMMENT ON COLUMN public.jobs.info_requested_by IS 'ID do recrutador que solicitou informações';
COMMENT ON COLUMN public.jobs.info_request_details IS 'Detalhes da solicitação de informações ao cliente';
COMMENT ON COLUMN public.jobs.cancelled_at IS 'Data e hora do cancelamento';
COMMENT ON COLUMN public.jobs.cancelled_by IS 'ID do recrutador que cancelou';
COMMENT ON COLUMN public.jobs.cancellation_reason IS 'Motivo do cancelamento da vaga';
