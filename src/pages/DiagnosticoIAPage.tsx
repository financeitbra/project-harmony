import { useMemo } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Shield,
  Database,
  Target,
  Cog,
  Layers,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

interface DimensionResult {
  id: string;
  title: string;
  icon: React.ElementType;
  avg: number;
  level: string;
  reading: string;
  status: "forte" | "atenção" | "lacuna";
}

interface GapItem {
  text: string;
  dimension: string;
}

interface DiagnosticData {
  overallAvg: number;
  overallPct: number;
  levelIndex: number; // 1-5
  levelLabel: string;
  levelDescription: string;
  executiveSummary: string;
  dimensions: DimensionResult[];
  gaps: GapItem[];
  nextStepTitle: string;
  nextStepText: string;
}

/* ================================================================== */
/*  Scoring & diagnostic engine                                        */
/* ================================================================== */

const dimensionMeta: { id: string; title: string; icon: React.ElementType; questionPrefix: string }[] = [
  { id: "contexto", title: "Contexto atual", icon: Layers, questionPrefix: "ctx" },
  { id: "dados", title: "Dados", icon: Database, questionPrefix: "dados" },
  { id: "governanca", title: "Governança", icon: Shield, questionPrefix: "gov" },
  { id: "casos-uso", title: "Casos de uso", icon: Target, questionPrefix: "cu" },
  { id: "execucao", title: "Execução operacional", icon: Cog, questionPrefix: "exec" },
];

function dimAvgToLevel(avg: number): { level: string; status: DimensionResult["status"] } {
  if (avg <= 1.6) return { level: "Baixa prontidão", status: "lacuna" };
  if (avg <= 2.4) return { level: "Prontidão parcial", status: "lacuna" };
  if (avg <= 3.2) return { level: "Prontidão em evolução", status: "atenção" };
  if (avg <= 4.0) return { level: "Boa prontidão", status: "forte" };
  return { level: "Prontidão avançada", status: "forte" };
}

const dimensionReadings: Record<string, Record<string, string>> = {
  contexto: {
    lacuna:
      "A empresa ainda não possui uma agenda estruturada para IA. As iniciativas, quando existem, são reativas ou motivadas por pressão externa, sem direção clara.",
    atenção:
      "Há consciência sobre IA e algum movimento, mas ainda falta uma direção estratégica definida e uma conexão mais consistente entre intenção e capacidade real.",
    forte:
      "A empresa demonstra boa clareza sobre o papel da IA no negócio e já possui uma agenda de evolução com conexão entre estratégia e operação.",
  },
  dados: {
    lacuna:
      "A base de dados é fragmentada, inconsistente ou de baixa acessibilidade. Isso compromete diretamente a capacidade de gerar valor com IA em escala.",
    atenção:
      "Há algum nível de disponibilidade e organização, mas ainda com inconsistências que podem comprometer escala e confiabilidade das iniciativas com IA.",
    forte:
      "Os dados estão relativamente bem estruturados, acessíveis e com qualidade suficiente para sustentar iniciativas de IA com maior confiabilidade.",
  },
  governanca: {
    lacuna:
      "Não há critérios, políticas ou responsabilidades definidas para uso de dados e tecnologia. A ausência de governança torna qualquer avanço com IA instável.",
    atenção:
      "Existem elementos parciais de governança, mas sem a consistência necessária para sustentar evolução com segurança e responsabilidade.",
    forte:
      "A governança está estruturada, com ownership definido, políticas de uso e segurança em operação e critérios claros para evolução.",
  },
  "casos-uso": {
    lacuna:
      "Os possíveis casos de uso são vagos, genéricos ou desconectados do negócio real. Sem clareza, o risco de investimento sem retorno é alto.",
    atenção:
      "Há identificação parcial de casos de uso, mas ainda falta priorização com base em aderência ao negócio e capacidade real de mensuração de valor.",
    forte:
      "Os casos de uso estão claramente identificados, priorizados com base em impacto e conectados a problemas reais do negócio.",
  },
  execucao: {
    lacuna:
      "A empresa tem baixa capacidade operacional para implementar, testar e sustentar iniciativas com IA. A distância entre tecnologia e operação é significativa.",
    atenção:
      "Existe capacidade parcial de execução, mas com desalinhamento entre áreas ou dificuldade de transformar validações em processos escaláveis.",
    forte:
      "As áreas de negócio e tecnologia trabalham com bom alinhamento, e a empresa possui capacidade real de colocar iniciativas validadas em operação.",
  },
};

const gapBank: Record<string, string[]> = {
  contexto: [
    "ausência de agenda estruturada para evolução com IA",
    "discussão sobre IA motivada por pressão de mercado, sem direção estratégica",
  ],
  dados: [
    "dados fragmentados entre áreas, com baixa integração",
    "inconsistência e baixa confiabilidade da base de dados disponível",
    "ausência de critérios claros sobre uso, acesso e finalidade dos dados",
  ],
  governanca: [
    "ausência de governança clara para iniciativas com dados e IA",
    "falta de definição de responsabilidades e ownership sobre dados",
    "políticas de segurança e uso responsável insuficientes",
  ],
  "casos-uso": [
    "pouca clareza sobre casos de uso prioritários e aderentes ao negócio",
    "dificuldade de mensurar valor real nas iniciativas com IA",
  ],
  execucao: [
    "baixa capacidade de escalar iniciativas validadas",
    "desalinhamento entre áreas de negócio e tecnologia",
    "dificuldade de transformar testes em processos operacionais consistentes",
  ],
};

const levelLabels = [
  "Baixa prontidão",
  "Prontidão parcial",
  "Prontidão em evolução",
  "Boa prontidão",
  "Prontidão avançada",
];

const levelDescriptions = [
  "A empresa está nos primeiros passos em relação à prontidão para IA. Dados, governança e capacidade operacional ainda precisam de estruturação fundamental antes de avançar com iniciativas consistentes.",
  "A empresa demonstra sinais de avanço em algumas frentes, mas ainda apresenta lacunas importantes em dados, governança, clareza de casos de uso ou capacidade de execução, o que pode limitar a geração de valor em iniciativas com IA.",
  "Há uma base em construção, com elementos parcialmente estruturados. A empresa precisa consolidar governança, melhorar a qualidade dos dados e definir prioridades mais claras para avançar com mais consistência.",
  "A empresa possui uma base sólida na maior parte das dimensões avaliadas. Há condições reais para escalar iniciativas com IA, desde que as frentes de atenção sejam endereçadas de forma consistente.",
  "A empresa demonstra alto nível de prontidão, com dados tratados como ativo estratégico, governança madura, capacidade operacional consolidada e alinhamento claro entre tecnologia e negócio.",
];

const executiveSummaries = [
  "A avaliação indica que a empresa ainda não possui as condições básicas para sustentar iniciativas com IA de forma consistente. A prioridade é estruturar fundamentos antes de avançar com experimentação, para evitar acumular pilotos frágeis sem retorno.",
  "A avaliação revela que a empresa já iniciou movimentos em direção à IA, mas lacunas em dados, governança ou execução ainda limitam a capacidade de gerar valor real. O foco deve estar em resolver esses pontos antes de expandir iniciativas.",
  "A avaliação mostra uma base em desenvolvimento, com pontos de força e áreas que ainda precisam de consolidação. A empresa tem potencial para avançar, mas precisa priorizar melhor e conectar mais fortemente dados, governança e execução.",
  "A avaliação demonstra uma base bem estruturada na maioria das dimensões. A empresa está em condições de escalar iniciativas com IA, com atenção aos pontos específicos que ainda podem limitar impacto ou sustentabilidade.",
  "A avaliação indica um estágio avançado de prontidão. A empresa possui condições reais para operar com IA como capacidade estratégica, expandindo aplicações com inteligência preditiva, automação avançada e integração ao planejamento de negócio.",
];

const nextSteps: { title: string; text: string }[] = [
  {
    title: "Estruturar fundamentos",
    text: "O avanço mais consistente neste estágio não está em acelerar ferramentas, mas em construir a base que sustenta decisões — dados, governança, responsabilidades e clareza sobre onde IA pode de fato gerar impacto.",
  },
  {
    title: "Consolidar base e reduzir lacunas",
    text: "O próximo passo é endereçar as lacunas mais críticas identificadas, especialmente em governança e qualidade de dados, para que as iniciativas existentes ganhem mais consistência e a empresa possa avançar com menor risco.",
  },
  {
    title: "Priorizar e conectar",
    text: "Com uma base parcialmente estruturada, o foco deve estar em priorizar casos de uso com maior aderência ao negócio e fortalecer a conexão entre dados, governança e capacidade de execução para gerar escala.",
  },
  {
    title: "Otimizar e expandir",
    text: "A empresa possui condições de expandir aplicações de IA com maior impacto. Recomendamos focar em otimizar pipelines de dados, ampliar casos de uso com ROI comprovado e fortalecer a conexão entre tecnologia e estratégia.",
  },
  {
    title: "Expandir fronteira de aplicação",
    text: "Com prontidão avançada, a empresa pode explorar a fronteira de IA generativa, automação inteligente e inteligência preditiva integrada ao planejamento estratégico, consolidando IA como capacidade competitiva real.",
  },
];

function computeFullDiagnostic(answers: Record<string, number>): DiagnosticData {
  const dimensions: DimensionResult[] = dimensionMeta.map((dm) => {
    const qKeys = Object.keys(answers).filter((k) => k.startsWith(dm.questionPrefix));
    const scores = qKeys.map((k) => answers[k]);
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 1;
    const { level, status } = dimAvgToLevel(avg);
    const readingKey = status === "lacuna" ? "lacuna" : status === "atenção" ? "atenção" : "forte";
    const reading = dimensionReadings[dm.id]?.[readingKey] ?? "";
    return { id: dm.id, title: dm.title, icon: dm.icon, avg, level, reading, status };
  });

  const allValues = Object.values(answers);
  const overallAvg = allValues.length > 0 ? allValues.reduce((a, b) => a + b, 0) / allValues.length : 1;
  const overallPct = Math.round((overallAvg / 5) * 100);

  let levelIndex: number;
  if (overallAvg <= 1.6) levelIndex = 0;
  else if (overallAvg <= 2.4) levelIndex = 1;
  else if (overallAvg <= 3.2) levelIndex = 2;
  else if (overallAvg <= 4.0) levelIndex = 3;
  else levelIndex = 4;

  // Collect gaps from weak dimensions
  const gaps: GapItem[] = [];
  dimensions.forEach((dim) => {
    if (dim.status === "lacuna" || dim.status === "atenção") {
      const dimGaps = gapBank[dim.id] ?? [];
      dimGaps.forEach((text) => gaps.push({ text, dimension: dim.title }));
    }
  });

  return {
    overallAvg,
    overallPct,
    levelIndex: levelIndex + 1,
    levelLabel: levelLabels[levelIndex],
    levelDescription: levelDescriptions[levelIndex],
    executiveSummary: executiveSummaries[levelIndex],
    dimensions,
    gaps: gaps.slice(0, 5),
    nextStepTitle: nextSteps[levelIndex].title,
    nextStepText: nextSteps[levelIndex].text,
  };
}

/* ================================================================== */
/*  Visual helpers                                                     */
/* ================================================================== */

const levelColors: Record<number, { text: string; bg: string; bar: string; border: string }> = {
  1: { text: "text-destructive", bg: "bg-destructive/15", bar: "bg-destructive", border: "border-destructive/30" },
  2: { text: "text-orange-accent", bg: "bg-orange-accent/15", bar: "bg-orange-accent", border: "border-orange-accent/30" },
  3: { text: "text-accent", bg: "bg-accent/15", bar: "bg-accent", border: "border-accent/30" },
  4: { text: "text-teal", bg: "bg-teal/15", bar: "bg-teal", border: "border-teal/30" },
  5: { text: "text-teal", bg: "bg-teal/15", bar: "bg-teal", border: "border-teal/30" },
};

const statusVisuals: Record<DimensionResult["status"], { label: string; color: string; bg: string; icon: React.ElementType }> = {
  lacuna: { label: "Lacuna prioritária", color: "text-destructive", bg: "bg-destructive/10", icon: XCircle },
  atenção: { label: "Ponto de atenção", color: "text-orange-accent", bg: "bg-orange-accent/10", icon: AlertTriangle },
  forte: { label: "Ponto forte", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle2 },
};

const levelIcons: Record<number, React.ElementType> = {
  1: XCircle,
  2: AlertTriangle,
  3: TrendingUp,
  4: CheckCircle2,
  5: CheckCircle2,
};

/* ================================================================== */
/*  Page component                                                     */
/* ================================================================== */

const DiagnosticoIAPage = () => {
  const location = useLocation();
  const answers = (location.state as { answers?: Record<string, number> })?.answers;

  const diagnostic = useMemo(() => {
    if (!answers || Object.keys(answers).length === 0) return null;
    return computeFullDiagnostic(answers);
  }, [answers]);

  // Redirect if accessed directly without answers
  if (!diagnostic) {
    return <Navigate to="/prontidao-ia/avaliacao" replace />;
  }

  const lc = levelColors[diagnostic.levelIndex] ?? levelColors[1];
  const LevelIcon = levelIcons[diagnostic.levelIndex] ?? TrendingUp;

  return (
    <div className="relative min-h-screen overflow-hidden bg-navy-gradient">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute left-1/2 top-[15%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-tech/[0.04] blur-[120px]" />
      <div className="absolute right-[5%] bottom-[20%] h-[300px] w-[300px] rounded-full bg-petrol/10 blur-[100px]" />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">

          {/* ============================================= */}
          {/* 1. BLOCO PRINCIPAL DE RESULTADO                */}
          {/* ============================================= */}
          <section className="mb-16">
            <div className="mb-8 text-center">
              <div className="mb-5 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
                <BarChart3 className="mr-2 h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-medium tracking-wide text-accent">Diagnóstico concluído</span>
              </div>
              <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
                Diagnóstico inicial de maturidade{" "}
                <span className="text-gradient">de dados e IA</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/60 md:text-base">
                Com base nas respostas fornecidas, esta é uma leitura estruturada do estágio atual da sua empresa para evoluir com inteligência artificial.
              </p>
            </div>

            {/* Main result card */}
            <div className={`rounded-2xl border ${lc.border} bg-primary-foreground/5 p-8 backdrop-blur-sm md:p-10`}>
              <div className="flex items-start gap-5">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${lc.bg}`}>
                  <LevelIcon className={`h-7 w-7 ${lc.text}`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
                    Nível de maturidade identificado
                  </p>
                  <h2 className={`mt-1 font-display text-2xl font-bold md:text-3xl ${lc.text}`}>
                    {diagnostic.levelLabel}
                  </h2>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <span className={`text-3xl font-extrabold ${lc.text}`}>{diagnostic.overallPct}%</span>
                  <span className="text-xs text-primary-foreground/40">índice<br />geral</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between text-xs text-primary-foreground/50 sm:hidden">
                  <span>Índice geral de prontidão</span>
                  <span className={`font-bold ${lc.text}`}>{diagnostic.overallPct}%</span>
                </div>
                {/* 5-segment scale */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((seg) => (
                    <div key={seg} className="h-2 flex-1 overflow-hidden rounded-full bg-primary-foreground/8">
                      {seg <= diagnostic.levelIndex && (
                        <div className={`h-full w-full rounded-full ${lc.bar} transition-all duration-700`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-primary-foreground/30">
                  <span>Baixa</span>
                  <span>Parcial</span>
                  <span>Em evolução</span>
                  <span>Boa</span>
                  <span>Avançada</span>
                </div>
              </div>

              <p className="mt-8 text-base leading-relaxed text-primary-foreground/70 md:text-lg">
                {diagnostic.levelDescription}
              </p>
            </div>
          </section>

          {/* ============================================= */}
          {/* 2. RESUMO EXECUTIVO                            */}
          {/* ============================================= */}
          <section className="mb-16">
            <h3 className="mb-5 font-display text-xl font-bold text-primary-foreground md:text-2xl">
              Resumo executivo
            </h3>
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm md:p-10">
              <p className="text-base leading-relaxed text-primary-foreground/70 md:text-lg">
                {diagnostic.executiveSummary}
              </p>
            </div>
          </section>

          {/* ============================================= */}
          {/* 3. LEITURA POR DIMENSÃO                        */}
          {/* ============================================= */}
          <section className="mb-16">
            <h3 className="mb-5 font-display text-xl font-bold text-primary-foreground md:text-2xl">
              Leitura por dimensão
            </h3>
            <div className="space-y-4">
              {diagnostic.dimensions.map((dim) => {
                const sv = statusVisuals[dim.status];
                const StatusIcon = sv.icon;
                const DimIcon = dim.icon;
                const pct = Math.round((dim.avg / 5) * 100);

                return (
                  <div
                    key={dim.id}
                    className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm md:p-8"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                          <DimIcon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-display text-base font-bold text-primary-foreground md:text-lg">
                            {dim.title}
                          </h4>
                          <p className="mt-0.5 text-xs text-primary-foreground/50">
                            Nível percebido: <span className="font-medium text-primary-foreground/70">{dim.level}</span>
                          </p>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${sv.bg}`}>
                        <StatusIcon className={`h-3.5 w-3.5 ${sv.color}`} />
                        <span className={`text-xs font-semibold ${sv.color}`}>{sv.label}</span>
                      </div>
                    </div>

                    {/* Bar */}
                    <div className="mt-5">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-foreground/8">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            dim.status === "lacuna"
                              ? "bg-destructive"
                              : dim.status === "atenção"
                              ? "bg-orange-accent"
                              : "bg-teal"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-primary-foreground/60 md:text-base">
                      {dim.reading}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ============================================= */}
          {/* 4. LACUNAS PRIORITÁRIAS                        */}
          {/* ============================================= */}
          {diagnostic.gaps.length > 0 && (
            <section className="mb-16">
              <h3 className="mb-5 font-display text-xl font-bold text-primary-foreground md:text-2xl">
                Principais lacunas percebidas
              </h3>
              <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm md:p-10">
                <ul className="space-y-4">
                  {diagnostic.gaps.map((gap, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-accent" />
                      <div>
                        <p className="text-sm leading-relaxed text-primary-foreground/70 md:text-base">
                          {gap.text}
                        </p>
                        <p className="mt-0.5 text-xs text-primary-foreground/40">
                          Dimensão: {gap.dimension}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* ============================================= */}
          {/* 5. PRÓXIMO PASSO RECOMENDADO                   */}
          {/* ============================================= */}
          <section className="mb-16">
            <h3 className="mb-5 font-display text-xl font-bold text-primary-foreground md:text-2xl">
              Próximo passo recomendado
            </h3>
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 backdrop-blur-sm md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-accent md:text-lg">
                    {diagnostic.nextStepTitle}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70 md:text-base">
                    {diagnostic.nextStepText}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================= */}
          {/* 6. PRESCRIÇÃO FUTURA                           */}
          {/* ============================================= */}
          <section className="mb-16">
            <h3 className="mb-5 font-display text-xl font-bold text-primary-foreground md:text-2xl">
              Prescrição mais precisa depende do contexto do seu negócio
            </h3>
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm md:p-10">
              <p className="text-sm leading-relaxed text-primary-foreground/60 md:text-base">
                Este diagnóstico oferece uma leitura inicial da maturidade da empresa. A definição de prioridades mais específicas depende das dores de negócio, das áreas críticas envolvidas e da direção estratégica que a organização pretende seguir.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/60 md:text-base">
                Uma prescrição mais detalhada — com recomendações por frente, sequência de evolução e priorização de investimento — pode ser construída a partir de uma conversa estratégica com a equipe da Financeit.
              </p>
            </div>
          </section>

          {/* ============================================= */}
          {/* 7. CTA FINAL                                   */}
          {/* ============================================= */}
          <section className="mb-8">
            <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-primary-foreground/5 to-transparent p-8 text-center backdrop-blur-sm md:p-12">
              <div className="mb-5 inline-flex items-center justify-center rounded-full bg-accent/15 p-3">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-foreground md:text-2xl lg:text-3xl">
                Se quiser aprofundar esse diagnóstico, o próximo passo é transformar leitura em direção prática.
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/60 md:text-base">
                A Financeit pode apoiar sua empresa na análise das lacunas identificadas, na definição de prioridades e na estruturação da base necessária para evoluir com IA de forma consistente.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to="/contato">
                    Solicitar conversa estratégica
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground hover:border-primary-foreground/50 hover:bg-primary-foreground/15"
                  asChild
                >
                  <Link to="/prontidao-ia/avaliacao">Refazer avaliação</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Back link */}
          <div className="text-center">
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

export default DiagnosticoIAPage;
