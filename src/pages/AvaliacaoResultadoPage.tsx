import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import {
  BarChart3,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Loader2,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

/* ================================================================== */
/*  Types & helpers                                                    */
/* ================================================================== */

interface Assessment {
  id: string;
  total_score: number;
  maturity_level: string;
  responses: Record<string, Array<{ question_text: string; selected_option: string; option_index: number }>>;
  created_at: string;
  email: string;
  respondent_name?: string;
  company_name?: string;
}

interface BlockScore {
  block: string;
  label: string;
  avg: number;
  pct: number;
}

const blockLabels: Record<string, string> = {
  contexto_atual: "Contexto",
  dados: "Dados",
  governanca: "Governança",
  casos_uso: "Casos de Uso",
  execucao: "Execução",
};

const maturityConfig: Record<string, { label: string; color: string; icon: React.ElementType; summary: string; nextStep: string }> = {
  iniciante: {
    label: "Iniciante",
    color: "text-destructive",
    icon: XCircle,
    summary: "Sua empresa ainda está nos estágios iniciais de preparação para IA. É fundamental estruturar a base de dados, definir governança e entender onde a IA pode gerar valor real antes de investir em ferramentas.",
    nextStep: "Estruturar base de dados e governança",
  },
  em_evolucao: {
    label: "Em Evolução",
    color: "text-orange-accent",
    icon: AlertTriangle,
    summary: "Sua empresa começou a estruturar iniciativas, mas ainda há espaço para consolidação. Os pilares fundamentais existem de forma parcial e precisam de mais consistência.",
    nextStep: "Aprofundar governança e clareza de casos de uso",
  },
  parcial: {
    label: "Parcial",
    color: "text-accent",
    icon: TrendingUp,
    summary: "Sua empresa tem base parcial, mas precisa de consistência. Alguns pilares estão em bom estágio enquanto outros necessitam de atenção prioritária para viabilizar escala.",
    nextStep: "Integrar dados e operacionalizar casos de uso",
  },
  avancado: {
    label: "Avançado",
    color: "text-teal",
    icon: CheckCircle2,
    summary: "Sua empresa está bem preparada para evoluir com IA. A base de dados, governança e capacidade operacional permitem avançar com iniciativas mais robustas.",
    nextStep: "Escalar iniciativas e medir impacto",
  },
  lider: {
    label: "Líder",
    color: "text-teal",
    icon: CheckCircle2,
    summary: "Sua empresa está entre as mais preparadas para operar com IA. Os fundamentos estão sólidos e o próximo passo é expandir a fronteira de aplicação.",
    nextStep: "Otimizar e inovar com IA",
  },
};

function computeBlockScores(responses: Assessment["responses"]): BlockScore[] {
  return Object.entries(blockLabels).map(([key, label]) => {
    const items = responses?.[key] || [];
    if (items.length === 0) return { block: key, label, avg: 0, pct: 0 };
    const avgIndex = items.reduce((sum, r) => sum + r.option_index, 0) / items.length;
    const pct = Math.round((avgIndex / 4) * 100);
    return { block: key, label, avg: avgIndex, pct };
  });
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

const AvaliacaoResultadoPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const assessmentId = searchParams.get("assessment_id");
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const emailSentRef = useRef(false);

  useEffect(() => {
    const stateAssessment = (location.state as any)?.assessment;
    if (stateAssessment && stateAssessment.id === assessmentId) {
      setAssessment(stateAssessment as Assessment);
      setLoading(false);
      return;
    }

    if (!assessmentId) {
      setLoading(false);
      setError(true);
      return;
    }

    // TODO: Backend fetch will be added later
    setError(true);
    setLoading(false);
  }, [assessmentId, location.state]);

  // Auto-send email when assessment loads
  useEffect(() => {
    if (!assessment || emailSentRef.current) return;
    emailSentRef.current = true;

    // TODO: Email send will be added later
    const sendEmail = async () => {
      // Backend integration pending
    };

    sendEmail();
  }, [assessment]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-gradient">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-navy-gradient px-4">
        <p className="text-lg text-primary-foreground/70">Resultado não encontrado.</p>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/prontidao-ia/avaliacao">Fazer avaliação</Link>
        </Button>
      </div>
    );
  }

  const config = maturityConfig[assessment.maturity_level] || maturityConfig.parcial;
  const LevelIcon = config.icon;
  const blockScores = computeBlockScores(assessment.responses);
  const weakBlocks = [...blockScores].sort((a, b) => a.pct - b.pct).slice(0, 2);

  const radarData = blockScores.map((b) => ({
    subject: b.label,
    score: b.pct,
    fullMark: 100,
  }));

  return (
    <div className="relative min-h-screen overflow-hidden bg-navy-gradient">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute left-1/2 top-[15%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-tech/[0.04] blur-[120px]" />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-5 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              <BarChart3 className="mr-2 h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium tracking-wide text-accent">Diagnóstico concluído</span>
            </div>
            <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
              Diagnóstico de maturidade{" "}
              <span className="text-gradient">de dados e IA</span>
            </h1>
          </div>

          {/* Main result card */}
          <div className="mb-10 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm md:p-10">
            <div className="flex items-start gap-5">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${config.color === "text-destructive" ? "bg-destructive/15" : config.color === "text-orange-accent" ? "bg-orange-accent/15" : config.color === "text-accent" ? "bg-accent/15" : "bg-teal/15"}`}>
                <LevelIcon className={`h-7 w-7 ${config.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
                  Nível de maturidade
                </p>
                <h2 className={`mt-1 font-display text-2xl font-bold md:text-3xl ${config.color}`}>
                  {config.label}
                </h2>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className={`text-3xl font-extrabold ${config.color}`}>{assessment.total_score}</span>
                <span className="text-xs text-primary-foreground/40">/ 100</span>
              </div>
            </div>

            <div className="mt-6">
              <Progress
                value={assessment.total_score}
                className="h-2 bg-primary-foreground/10 [&>div]:bg-accent"
              />
              <div className="mt-2 flex justify-between text-[10px] text-primary-foreground/30">
                <span>Iniciante</span>
                <span>Em evolução</span>
                <span>Parcial</span>
                <span>Avançado</span>
                <span>Líder</span>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-primary-foreground/70 md:text-base">
              {config.summary}
            </p>
          </div>

          {/* Radar chart + Gaps side by side */}
          <div className="mb-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/40">
                Score por bloco
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(210 20% 98% / 0.1)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "hsl(210 20% 98% / 0.6)", fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "hsl(210 20% 98% / 0.3)", fontSize: 10 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="hsl(192 70% 42%)"
                    fill="hsl(192 70% 42%)"
                    fillOpacity={0.25}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/40">
                  Áreas com maior oportunidade
                </h3>
                <div className="space-y-3">
                  {weakBlocks.map((b) => (
                    <div key={b.block} className="flex items-center justify-between rounded-lg border border-primary-foreground/10 bg-primary-foreground/[0.03] px-4 py-3">
                      <span className="text-sm font-medium text-primary-foreground/80">{b.label}</span>
                      <span className="text-sm font-bold text-orange-accent">{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 backdrop-blur-sm">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
                  Próximo passo
                </h3>
                <p className="text-sm leading-relaxed text-primary-foreground/70">
                  {config.nextStep}
                </p>
              </div>
            </div>
          </div>

          {/* Block scores bars */}
          <div className="mb-10 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm md:p-8">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary-foreground/40">
              Detalhamento por dimensão
            </h3>
            <div className="space-y-4">
              {blockScores.map((b) => (
                <div key={b.block}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-primary-foreground/80">{b.label}</span>
                    <span className="font-bold text-accent">{b.pct}%</span>
                  </div>
                  <Progress
                    value={b.pct}
                    className="h-2 bg-primary-foreground/10 [&>div]:bg-accent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center backdrop-blur-sm md:p-10">
            <h3 className="font-display text-xl font-bold text-primary-foreground md:text-2xl">
              Quer aprofundar este diagnóstico?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/60">
              Converse com um especialista da Financeit para entender como evoluir a prontidão da sua empresa para IA com mais consistência e menos risco.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/contato">
                  Solicite uma conversa estratégica
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" className="bg-[#2198b6] text-white hover:bg-[#2198b6]/90" asChild>
                <Link to="/prontidao-ia/avaliacao">Refazer avaliação</Link>
              </Button>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              to="/prontidao-ia"
              className="text-sm text-primary-foreground/40 underline underline-offset-4 transition-colors hover:text-accent"
            >
              Voltar para Prontidão para IA
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvaliacaoResultadoPage;
