import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Clock,
  ListChecks,
  Target,
  Database,
  ShieldCheck,
  Network,
  Layers,
  AlertTriangle,
  Zap,
  Eye,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

/* ================================================================== */
/*  PART A — Educational content                                       */
/* ================================================================== */

const EducationalSections = ({ onStartAssessment }: { onStartAssessment: () => void }) => (
  <>
    {/* Hero */}
    <section className="relative overflow-hidden bg-navy-gradient text-primary-foreground">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
      <div className="absolute inset-0">
        <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-tech/[0.04] blur-[120px]" />
        <div className="absolute left-[5%] bottom-[10%] h-[250px] w-[250px] rounded-full bg-petrol/15 blur-[80px]" />
      </div>
      <div className="relative section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <BarChart3 className="mr-2 h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium tracking-wide text-accent">Prontidão para IA</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Avalie a prontidão da sua empresa para{" "}
            <span className="text-gradient">operar com inteligência artificial.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
            Antes de investir em IA, é fundamental entender se sua organização tem os pré-requisitos necessários: dados confiáveis, integração, governança, processos, segurança e patrocínio executivo.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/50 md:text-base">
            Responda ao assessment abaixo e receba um diagnóstico estruturado sobre o estágio de maturidade da sua empresa em relação à IA.
          </p>
          <div className="mt-10">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={onStartAssessment}>
              Iniciar avaliação
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* O que significa prontidão para IA */}
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" /> Conceito
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Prontidão para IA não é ter a tecnologia.{" "}
            <span className="text-accent">É ter a base para usá-la com resultado.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Prontidão para IA (AI Readiness) é a capacidade de uma organização de adotar, implementar e escalar inteligência artificial de forma sustentável, com valor mensurável e risco controlado. Isso envolve muito mais do que ferramentas — envolve dados, governança, processos, cultura e capacidade operacional.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Database, title: "Dados confiáveis", desc: "Qualidade, disponibilidade e integração de dados são pré-requisitos para qualquer modelo de IA gerar valor real." },
            { icon: ShieldCheck, title: "Governança estruturada", desc: "Políticas claras sobre ownership, acesso, uso e segurança de dados sustentam a escalabilidade." },
            { icon: Network, title: "Integração de sistemas", desc: "Fontes conectadas e interoperáveis eliminam silos e permitem visão unificada do negócio." },
            { icon: Layers, title: "Processos preparados", desc: "Fluxos operacionais que conseguem absorver outputs de IA e traduzi-los em ação concreta." },
            { icon: Target, title: "Casos de uso claros", desc: "Problemas reais do negócio bem definidos e priorizados, com métricas de valor identificadas." },
            { icon: Eye, title: "Patrocínio executivo", desc: "Liderança que entende, apoia e sustenta a jornada de evolução com inteligência artificial." },
          ].map((b) => (
            <div key={b.title} className="rounded-xl border border-border bg-card p-7 transition-all hover:border-accent/20 hover:shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
                <b.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Por que muitas empresas falham */}
    <section className="section-padding bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            A maioria das empresas que falham com IA{" "}
            <span className="text-accent">não falham pela tecnologia.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Elas falham porque tentam escalar IA sobre uma base que ainda não sustenta nem analytics básico com consistência. Dados fragmentados, governança ausente, processos desconectados e ausência de estratégia clara transformam pilotos promissores em projetos abandonados.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
          {[
            { icon: AlertTriangle, text: "Dados de baixa qualidade alimentam modelos que geram resultados errados" },
            { icon: Layers, text: "Silos organizacionais impedem que IA tenha visão completa do negócio" },
            { icon: ShieldCheck, text: "Ausência de governança cria riscos de compliance e segurança" },
            { icon: Zap, text: "Falta de capacidade operacional impede que pilotos virem produção" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/20 hover:shadow-sm">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-accent/10">
                <b.icon className="h-5 w-5 text-orange-accent" />
              </div>
              <p className="text-sm font-medium text-card-foreground md:text-base">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Como a Financeit ajuda */}
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            A Financeit ajuda a construir a prontidão que{" "}
            <span className="text-accent">sua empresa precisa antes de escalar IA.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Nossa abordagem parte do diagnóstico real: entender onde a empresa está, o que falta para evoluir com IA e qual a jornada mais eficiente para construir essa base. Com talentos, tecnologia, dados e governança conectados.
          </p>
        </div>
        <div className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-3">
          {[
            "Mapeamento de maturidade",
            "Diagnóstico de dados e governança",
            "Identificação de casos de uso viáveis",
            "Estruturação de base pronta para IA",
            "Apoio à evolução contínua",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-5 py-2.5">
              <CheckCircle className="h-4 w-4 flex-shrink-0 text-accent" />
              <span className="text-sm font-medium text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA para assessment */}
    <section className="relative overflow-hidden bg-navy-gradient">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
      <div className="container relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            Descubra o estágio real da sua empresa.{" "}
            <span className="text-gradient">Inicie a avaliação agora.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
            O assessment abaixo avalia cinco dimensões críticas da prontidão para IA e entrega um diagnóstico claro sobre o que precisa ser fortalecido.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-2.5">
              <Clock className="h-4 w-4 text-accent" />
              <span className="text-xs font-medium text-primary-foreground/70">3 a 5 minutos</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-2.5">
              <ListChecks className="h-4 w-4 text-accent" />
              <span className="text-xs font-medium text-primary-foreground/70">15 perguntas</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-2.5">
              <Target className="h-4 w-4 text-accent" />
              <span className="text-xs font-medium text-primary-foreground/70">Diagnóstico imediato</span>
            </div>
          </div>
          <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90" onClick={onStartAssessment}>
            Iniciar avaliação <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  </>
);

/* ================================================================== */
/*  PART B — Assessment                                                */
/* ================================================================== */

interface Option { label: string; value: number; }
interface Question { id: string; text: string; options: Option[]; }
interface Block { id: string; title: string; subtitle: string; questions: Question[]; }

const blocks: Block[] = [
  {
    id: "contexto", title: "Contexto atual", subtitle: "Entender o estágio geral da empresa em relação à IA.",
    questions: [
      { id: "ctx-1", text: "Como sua empresa se encontra hoje em relação ao uso de IA?", options: [
        { label: "Ainda não iniciamos nenhuma iniciativa", value: 1 },
        { label: "Estamos explorando possibilidades, mas sem estrutura definida", value: 2 },
        { label: "Temos iniciativas pontuais em teste", value: 3 },
        { label: "Já usamos IA em alguns processos com certa consistência", value: 4 },
        { label: "IA já faz parte de frentes relevantes da operação", value: 5 },
      ]},
      { id: "ctx-2", text: "A empresa já possui clareza sobre por que quer usar IA?", options: [
        { label: "Não", value: 1 }, { label: "Ainda de forma muito genérica", value: 2 },
        { label: "Parcialmente", value: 3 }, { label: "Sim, em algumas frentes", value: 4 },
        { label: "Sim, com prioridades razoavelmente definidas", value: 5 },
      ]},
      { id: "ctx-3", text: "Existe patrocínio executivo claro para iniciativas com IA?", options: [
        { label: "Não existe", value: 1 }, { label: "Interesse superficial", value: 2 },
        { label: "Apoio parcial", value: 3 }, { label: "Sim, em algumas frentes", value: 4 },
        { label: "Sim, com envolvimento ativo", value: 5 },
      ]},
    ],
  },
  {
    id: "dados", title: "Dados", subtitle: "Medir qualidade, disponibilidade e integração dos dados.",
    questions: [
      { id: "dados-1", text: "Como você descreveria a qualidade dos dados disponíveis?", options: [
        { label: "Muito baixa", value: 1 }, { label: "Baixa e inconsistente", value: 2 },
        { label: "Razoável, mas com lacunas", value: 3 }, { label: "Boa na maior parte", value: 4 },
        { label: "Alta e confiável", value: 5 },
      ]},
      { id: "dados-2", text: "Os dados relevantes estão integrados e acessíveis?", options: [
        { label: "Muito dispersos", value: 1 }, { label: "Distribuídos sem integração", value: 2 },
        { label: "Parcialmente organizados", value: 3 }, { label: "Relativamente integrados", value: 4 },
        { label: "Bem estruturados e acessíveis", value: 5 },
      ]},
      { id: "dados-3", text: "Existem critérios claros sobre uso e acesso a dados?", options: [
        { label: "Não possui", value: 1 }, { label: "Muito pouco", value: 2 },
        { label: "Parcialmente", value: 3 }, { label: "Sim, em algumas áreas", value: 4 },
        { label: "Sim, de forma bem definida", value: 5 },
      ]},
    ],
  },
  {
    id: "governanca", title: "Governança", subtitle: "Medir ownership, políticas e segurança.",
    questions: [
      { id: "gov-1", text: "Existe definição clara de responsabilidades sobre dados?", options: [
        { label: "Não existe", value: 1 }, { label: "Existe de forma informal", value: 2 },
        { label: "Existe parcialmente", value: 3 }, { label: "Na maior parte", value: 4 },
        { label: "Com boa clareza e consistência", value: 5 },
      ]},
      { id: "gov-2", text: "A empresa possui políticas para uso seguro de dados e IA?", options: [
        { label: "Não", value: 1 }, { label: "Muito pouco", value: 2 },
        { label: "Parcialmente", value: 3 }, { label: "Sim, em parte", value: 4 },
        { label: "Sim, com boa consistência", value: 5 },
      ]},
      { id: "gov-3", text: "Como avalia a governança para iniciativas de dados e IA?", options: [
        { label: "Inexistente", value: 1 }, { label: "Muito frágil", value: 2 },
        { label: "Parcial", value: 3 }, { label: "Estruturada em pontos", value: 4 },
        { label: "Bem estruturada", value: 5 },
      ]},
    ],
  },
  {
    id: "casos-uso", title: "Casos de uso", subtitle: "Medir clareza e aderência ao negócio.",
    questions: [
      { id: "cu-1", text: "Os potenciais casos de uso de IA estão identificados?", options: [
        { label: "Pouco claros", value: 1 }, { label: "Muito genéricos", value: 2 },
        { label: "Parcialmente mapeados", value: 3 }, { label: "Razoavelmente identificados", value: 4 },
        { label: "Claramente definidos e priorizados", value: 5 },
      ]},
      { id: "cu-2", text: "As iniciativas com IA estão conectadas a problemas reais?", options: [
        { label: "Não", value: 1 }, { label: "Muito pouco", value: 2 },
        { label: "Em alguns casos", value: 3 }, { label: "Na maior parte", value: 4 },
        { label: "Sim, com forte aderência", value: 5 },
      ]},
      { id: "cu-3", text: "Existe clareza sobre como medir valor nas iniciativas com IA?", options: [
        { label: "Não existe", value: 1 }, { label: "Muito baixa", value: 2 },
        { label: "Parcial", value: 3 }, { label: "Boa em algumas frentes", value: 4 },
        { label: "Clara e bem definida", value: 5 },
      ]},
    ],
  },
  {
    id: "execucao", title: "Execução operacional", subtitle: "Medir capacidade real de absorver valor.",
    questions: [
      { id: "exec-1", text: "A empresa tem capacidade operacional para implementar IA?", options: [
        { label: "Muito baixa", value: 1 }, { label: "Baixa", value: 2 },
        { label: "Parcial", value: 3 }, { label: "Boa em algumas frentes", value: 4 },
        { label: "Alta e consistente", value: 5 },
      ]},
      { id: "exec-2", text: "Negócio e tecnologia trabalham de forma alinhada?", options: [
        { label: "Muito pouco", value: 1 }, { label: "Baixo alinhamento", value: 2 },
        { label: "Alinhamento parcial", value: 3 }, { label: "Bom alinhamento", value: 4 },
        { label: "Alinhamento forte e recorrente", value: 5 },
      ]},
      { id: "exec-3", text: "Se uma iniciativa de IA mostrar valor, a empresa conseguiria escalar?", options: [
        { label: "Muito dificilmente", value: 1 }, { label: "Com bastante dificuldade", value: 2 },
        { label: "Parcialmente", value: 3 }, { label: "Com boa chance", value: 4 },
        { label: "Sim, com boa capacidade", value: 5 },
      ]},
    ],
  },
];

const totalQuestions = blocks.reduce((sum, b) => sum + b.questions.length, 0);

/* ─── Scoring ─── */
interface LevelResult {
  level: string;
  color: string;
  description: string;
  recommendation: string;
}

function getResult(score: number): LevelResult {
  const pct = (score / (totalQuestions * 5)) * 100;
  if (pct <= 25) return { level: "Inicial", color: "text-destructive", description: "A empresa está nos primeiros estágios de prontidão para IA. Há lacunas significativas em dados, governança e clareza de direção.", recommendation: "Recomendamos iniciar pelo diagnóstico de maturidade e pela estruturação da base de dados antes de qualquer iniciativa com IA." };
  if (pct <= 45) return { level: "Em formação", color: "text-orange-accent", description: "Existem avanços iniciais, mas a base ainda é frágil para sustentar iniciativas de IA com consistência.", recommendation: "Foque em fortalecer governança, integração de dados e definição de casos de uso prioritários." };
  if (pct <= 65) return { level: "Em desenvolvimento", color: "text-accent", description: "A empresa tem elementos importantes, mas precisa amadurecer a conexão entre dados, processos e capacidade de execução.", recommendation: "Avance na integração entre áreas, fortaleça a governança e comece a testar casos de uso com dados confiáveis." };
  if (pct <= 85) return { level: "Avançado", color: "text-green-accent", description: "A organização tem boa base para IA. Dados razoavelmente integrados, governança presente e clareza de direção.", recommendation: "Escale casos de uso prioritários, invista em automação de pipelines e fortaleça a cultura orientada a dados." };
  return { level: "Maduro", color: "text-green-accent", description: "A empresa demonstra alta prontidão para IA com base sólida em dados, governança e capacidade operacional.", recommendation: "Foque em escala, inovação contínua e evolução da arquitetura para IA generativa e produtos inteligentes." };
}

/* ─── Assessment Component ─── */
const AssessmentSection = () => {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const block = blocks[currentBlock];
  const question = block?.questions[currentQ];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;
  const canAdvance = question && answers[question.id] !== undefined;

  const handleSelect = useCallback((value: string) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: Number(value) }));
  }, [question]);

  const handleNext = () => {
    if (currentQ < block.questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else if (currentBlock < blocks.length - 1) {
      setCurrentBlock((b) => b + 1);
      setCurrentQ(0);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
    else if (currentBlock > 0) {
      setCurrentBlock((b) => b - 1);
      setCurrentQ(blocks[currentBlock - 1].questions.length - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentBlock(0);
    setCurrentQ(0);
    setShowResult(false);
  };

  const isFirst = currentBlock === 0 && currentQ === 0;
  const isLast = currentBlock === blocks.length - 1 && currentQ === block.questions.length - 1;

  let flatIndex = 0;
  for (let b = 0; b < currentBlock; b++) flatIndex += blocks[b].questions.length;
  flatIndex += currentQ;

  /* ─── Result screen ─── */
  if (showResult) {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    const result = getResult(totalScore);
    const pct = Math.round((totalScore / (totalQuestions * 5)) * 100);

    return (
      <section id="assessment" className="relative min-h-screen overflow-hidden bg-navy-gradient">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="container relative z-10 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              <BarChart3 className="mr-2 h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">Resultado da avaliação</span>
            </span>
            <h2 className="font-display text-3xl font-extrabold text-primary-foreground md:text-4xl">
              Nível de prontidão: <span className={result.color}>{result.level}</span>
            </h2>
            <div className="mx-auto mt-8 max-w-md">
              <div className="flex items-center justify-between text-sm text-primary-foreground/50 mb-2">
                <span>Pontuação</span>
                <span className="font-bold text-accent">{totalScore}/{totalQuestions * 5} ({pct}%)</span>
              </div>
              <Progress value={pct} className="h-3 bg-primary-foreground/10 [&>div]:bg-accent" />
            </div>
            <div className="mx-auto mt-8 max-w-xl rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 text-left">
              <p className="text-base leading-relaxed text-primary-foreground/85">{result.description}</p>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/60"><strong className="text-accent">Recomendação:</strong> {result.recommendation}</p>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/contato">Fale com a Financeit <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleRestart}>
                Refazer avaliação
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Questionnaire screen ─── */
  return (
    <section id="assessment" className="relative min-h-screen overflow-hidden bg-navy-gradient">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="container relative z-10 py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Block stepper */}
          <div className="mb-8">
            <div className="flex items-center gap-1.5">
              {blocks.map((b, i) => (
                <div key={b.id} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className={`h-1 w-full rounded-full transition-all ${i < currentBlock ? "bg-accent" : i === currentBlock ? "bg-accent/60" : "bg-primary-foreground/10"}`} />
                  <span className={`hidden text-[10px] font-medium uppercase tracking-wider sm:block ${i === currentBlock ? "text-accent" : i < currentBlock ? "text-accent/60" : "text-primary-foreground/30"}`}>{b.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6 flex items-center justify-between text-xs text-primary-foreground/50">
            <span className="font-medium text-accent">{block.title}</span>
            <span>Pergunta {flatIndex + 1} de {totalQuestions}</span>
          </div>
          <Progress value={progress} className="mb-10 h-1 bg-primary-foreground/10 [&>div]:bg-accent" />
          <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm md:p-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">{block.subtitle}</p>
            <h3 className="font-display text-lg font-bold leading-snug text-primary-foreground md:text-xl">{question?.text}</h3>
            <RadioGroup value={answers[question?.id ?? ""]?.toString()} onValueChange={handleSelect} className="mt-8 space-y-3">
              {question?.options.map((opt) => (
                <Label key={opt.value} htmlFor={`${question.id}-${opt.value}`} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm font-medium transition-all md:text-base ${answers[question.id] === opt.value ? "border-accent bg-accent/10 text-primary-foreground" : "border-primary-foreground/10 bg-primary-foreground/[0.02] text-primary-foreground/70 hover:border-primary-foreground/20"}`}>
                  <RadioGroupItem value={opt.value.toString()} id={`${question.id}-${opt.value}`} className="border-primary-foreground/30 text-accent" />
                  {opt.label}
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" className="text-primary-foreground/50 hover:text-primary-foreground" onClick={handleBack} disabled={isFirst}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Anterior
            </Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleNext} disabled={!canAdvance}>
              {isLast ? "Ver resultado" : "Próxima"} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================================================================== */
/*  Page                                                                */
/* ================================================================== */

const AvalieProntidaoPage = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  if (showAssessment) {
    return <AssessmentSection />;
  }

  return <EducationalSections onStartAssessment={() => setShowAssessment(true)} />;
};

export default AvalieProntidaoPage;
