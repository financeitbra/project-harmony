
-- ═══════════════════════════════════════════════════════════════
-- TABLE 1: ai_readiness_assessments
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE public.ai_readiness_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID NULL,
  email TEXT NOT NULL,
  company_name TEXT NULL,
  respondent_name TEXT NULL,
  respondent_role TEXT NULL,
  responses JSONB NULL,
  total_score INTEGER NULL,
  maturity_level TEXT NULL,
  assessment_duration_seconds INTEGER NULL,
  ip_address INET NULL,
  user_agent TEXT NULL,
  status TEXT NOT NULL DEFAULT 'completed'
);

CREATE INDEX idx_ai_readiness_user_id ON public.ai_readiness_assessments(user_id);
CREATE INDEX idx_ai_readiness_email ON public.ai_readiness_assessments(email);
CREATE INDEX idx_ai_readiness_created_at ON public.ai_readiness_assessments(created_at);
CREATE INDEX idx_ai_readiness_maturity_level ON public.ai_readiness_assessments(maturity_level);
CREATE INDEX idx_ai_readiness_company_name ON public.ai_readiness_assessments(company_name);

ALTER TABLE public.ai_readiness_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own assessments"
ON public.ai_readiness_assessments FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can read all assessments"
ON public.ai_readiness_assessments FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can insert own assessments"
ON public.ai_readiness_assessments FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role full access on assessments"
ON public.ai_readiness_assessments FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════
-- TABLE 2: ai_readiness_responses
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE public.ai_readiness_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.ai_readiness_assessments(id) ON DELETE CASCADE,
  block_name TEXT NOT NULL,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  selected_option TEXT NOT NULL,
  option_index INTEGER NOT NULL,
  score_value INTEGER NOT NULL,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(assessment_id, block_name, question_number)
);

ALTER TABLE public.ai_readiness_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own responses"
ON public.ai_readiness_responses FOR SELECT TO authenticated
USING (
  assessment_id IN (
    SELECT id FROM public.ai_readiness_assessments WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can read all responses"
ON public.ai_readiness_responses FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can insert own responses"
ON public.ai_readiness_responses FOR INSERT TO authenticated
WITH CHECK (
  assessment_id IN (
    SELECT id FROM public.ai_readiness_assessments WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Service role full access on responses"
ON public.ai_readiness_responses FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════
-- TABLE 3: ai_readiness_metrics
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE public.ai_readiness_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metric_date DATE NOT NULL UNIQUE,
  total_assessments INTEGER NOT NULL DEFAULT 0,
  average_score DECIMAL(5,2) NOT NULL DEFAULT 0,
  count_iniciante INTEGER NOT NULL DEFAULT 0,
  count_em_evolucao INTEGER NOT NULL DEFAULT 0,
  count_parcial INTEGER NOT NULL DEFAULT 0,
  count_avancado INTEGER NOT NULL DEFAULT 0,
  count_lider INTEGER NOT NULL DEFAULT 0,
  avg_score_contexto DECIMAL(5,2) NOT NULL DEFAULT 0,
  avg_score_dados DECIMAL(5,2) NOT NULL DEFAULT 0,
  avg_score_governanca DECIMAL(5,2) NOT NULL DEFAULT 0,
  avg_score_casos_uso DECIMAL(5,2) NOT NULL DEFAULT 0,
  avg_score_execucao DECIMAL(5,2) NOT NULL DEFAULT 0
);

ALTER TABLE public.ai_readiness_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read metrics"
ON public.ai_readiness_metrics FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role full access on metrics"
ON public.ai_readiness_metrics FOR ALL TO service_role
USING (true) WITH CHECK (true);
