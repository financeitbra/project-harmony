import { useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Clock,
  ListChecks,
  Target,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { emailService } from "@/services/api";

/* ================================================================== */
/*  Data model                                                         */
/* ================================================================== */

interface Option {
  label: string;
  value: number; // 1–5
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Block {
  id: string;
  backendKey: string;
  title: string;
  subtitle: string;
  questions: Question[];
}

const blocks: Block[] = [
  {
    id: "contexto", backendKey: "contexto_atual",
    title: "Contexto atual",
    subtitle: "Entender o estágio geral da empresa em relação à IA.",
    questions: [
      {
        id: "ctx-1",
        text: "Como sua empresa se encontra hoje em relação ao uso de IA?",
        options: [
          { label: "Ainda não iniciamos nenhuma iniciativa", value: 1 },
          { label: "Estamos explorando possibilidades, mas sem estrutura definida", value: 2 },
          { label: "Temos iniciativas pontuais em teste", value: 3 },
          { label: "Já usamos IA em alguns processos com certa consistência", value: 4 },
          { label: "IA já faz parte de frentes relevantes da operação", value: 5 },
        ],
      },
      {
        id: "ctx-2",
        text: "Hoje, a discussão sobre IA na empresa está mais concentrada em:",
        options: [
          { label: "Interesse estratégico da liderança", value: 1 },
          { label: "Curiosidade ou pressão de mercado", value: 2 },
          { label: "Projetos isolados de tecnologia", value: 3 },
          { label: "Necessidades operacionais específicas", value: 4 },
          { label: "Já existe uma agenda mais estruturada de evolução", value: 5 },
        ],
      },
    ],
  },
  {
    id: "dados", backendKey: "dados",
    title: "Dados",
    subtitle: "Medir qualidade, disponibilidade e integração dos dados.",
    questions: [
      {
        id: "dados-1",
        text: "Como você descreveria a qualidade dos dados disponíveis para análise e uso operacional?",
        options: [
          { label: "Muito baixa", value: 1 },
          { label: "Baixa e inconsistente", value: 2 },
          { label: "Razoável, mas com lacunas", value: 3 },
          { label: "Boa na maior parte dos casos", value: 4 },
          { label: "Alta e confiável", value: 5 },
        ],
      },
      {
        id: "dados-2",
        text: "Os dados relevantes para o negócio estão:",
        options: [
          { label: "Muito dispersos e pouco acessíveis", value: 1 },
          { label: "Distribuídos entre áreas sem integração", value: 2 },
          { label: "Parcialmente organizados", value: 3 },
          { label: "Relativamente integrados", value: 4 },
          { label: "Bem estruturados e acessíveis", value: 5 },
        ],
      },
      {
        id: "dados-3",
        text: "A empresa possui critérios claros sobre quais dados podem ser usados, por quem e com que finalidade?",
        options: [
          { label: "Não possui", value: 1 },
          { label: "Muito pouco", value: 2 },
          { label: "Parcialmente", value: 3 },
          { label: "Sim, em algumas áreas", value: 4 },
          { label: "Sim, de forma bem definida", value: 5 },
        ],
      },
    ],
  },
  {
    id: "governanca", backendKey: "governanca",
    title: "Governança",
    subtitle: "Medir ownership, políticas e segurança.",
    questions: [
      {
        id: "gov-1",
        text: "Existe definição clara de responsabilidades sobre dados, acessos e uso de informações?",
        options: [
          { label: "Não existe", value: 1 },
          { label: "Existe de forma informal", value: 2 },
          { label: "Existe parcialmente", value: 3 },
          { label: "Existe na maior parte dos casos", value: 4 },
          { label: "Existe com boa clareza e consistência", value: 5 },
        ],
      },
      {
        id: "gov-2",
        text: "Como você avalia a governança atual para iniciativas que envolvem dados e IA?",
        options: [
          { label: "Inexistente", value: 1 },
          { label: "Muito frágil", value: 2 },
          { label: "Parcial", value: 3 },
          { label: "Estruturada em alguns pontos", value: 4 },
          { label: "Bem estruturada", value: 5 },
        ],
      },
      {
        id: "gov-3",
        text: "A empresa possui políticas, critérios ou diretrizes para uso seguro e responsável de dados e tecnologia?",
        options: [
          { label: "Não", value: 1 },
          { label: "Muito pouco", value: 2 },
          { label: "Parcialmente", value: 3 },
          { label: "Sim, em parte da operação", value: 4 },
          { label: "Sim, com boa consistência", value: 5 },
        ],
      },
    ],
  },
  {
    id: "casos-uso", backendKey: "casos_uso",
    title: "Casos de uso",
    subtitle: "Medir clareza e aderência ao negócio.",
    questions: [
      {
        id: "cu-1",
        text: "Os potenciais casos de uso de IA estão:",
        options: [
          { label: "Pouco claros", value: 1 },
          { label: "Muito genéricos", value: 2 },
          { label: "Parcialmente mapeados", value: 3 },
          { label: "Razoavelmente identificados", value: 4 },
          { label: "Claramente definidos e priorizados", value: 5 },
        ],
      },
      {
        id: "cu-2",
        text: "Hoje, as iniciativas com IA estão conectadas a problemas reais do negócio?",
        options: [
          { label: "Não", value: 1 },
          { label: "Muito pouco", value: 2 },
          { label: "Em alguns casos", value: 3 },
          { label: "Na maior parte das iniciativas", value: 4 },
          { label: "Sim, com forte aderência", value: 5 },
        ],
      },
      {
        id: "cu-3",
        text: "Existe clareza sobre como medir valor nas iniciativas com IA?",
        options: [
          { label: "Não existe", value: 1 },
          { label: "Muito baixa", value: 2 },
          { label: "Parcial", value: 3 },
          { label: "Boa em algumas frentes", value: 4 },
          { label: "Clara e bem definida", value: 5 },
        ],
      },
      {
        id: "cu-4",
        text: "A empresa já possui clareza sobre por que quer usar IA?",
        options: [
          { label: "Não", value: 1 },
          { label: "Ainda de forma muito genérica", value: 2 },
          { label: "Parcialmente", value: 3 },
          { label: "Sim, em algumas frentes", value: 4 },
          { label: "Sim, com prioridades razoavelmente definidas", value: 5 },
        ],
      },
    ],
  },
  {
    id: "execucao", backendKey: "execucao",
    title: "Execução operacional",
    subtitle: "Medir capacidade real de absorver valor.",
    questions: [
      {
        id: "exec-1",
        text: "A empresa tem capacidade operacional para implementar, testar e sustentar iniciativas com IA?",
        options: [
          { label: "Muito baixa", value: 1 },
          { label: "Baixa", value: 2 },
          { label: "Parcial", value: 3 },
          { label: "Boa em algumas frentes", value: 4 },
          { label: "Alta e consistente", value: 5 },
        ],
      },
      {
        id: "exec-2",
        text: "As áreas de negócio e tecnologia trabalham de forma alinhada na evolução de iniciativas digitais?",
        options: [
          { label: "Muito pouco alinhadas", value: 1 },
          { label: "Baixo alinhamento", value: 2 },
          { label: "Alinhamento parcial", value: 3 },
          { label: "Bom alinhamento", value: 4 },
          { label: "Alinhamento forte e recorrente", value: 5 },
        ],
      },
      {
        id: "exec-3",
        text: "Se uma iniciativa com IA mostrar valor, a empresa conseguiria colocá-la em operação com consistência?",
        options: [
          { label: "Muito dificilmente", value: 1 },
          { label: "Com bastante dificuldade", value: 2 },
          { label: "Parcialmente", value: 3 },
          { label: "Com boa chance de sucesso", value: 4 },
          { label: "Sim, com boa capacidade de escala", value: 5 },
        ],
      },
    ],
  },
];

const totalQuestions = blocks.reduce((sum, b) => sum + b.questions.length, 0);

/* ================================================================== */
/*  Page component                                                     */
/* ================================================================== */

const AvaliacaoIAPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const startTimeRef = useRef(Date.now());

  const [currentBlock, setCurrentBlock] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showIntro, setShowIntro] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const block = blocks[currentBlock];
  const question = block?.questions[currentQ];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;
  const canAdvance = question && answers[question.id] !== undefined;

  const handleSelect = useCallback(
    (value: string) => {
      if (!question) return;
      setAnswers((prev) => ({ ...prev, [question.id]: Number(value) }));
    },
    [question]
  );

  const handleSubmit = async () => {
    if (submitting) return;

    // Validate email
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast({ title: "E-mail inválido", description: "Por favor, informe um e-mail válido para receber o resultado.", variant: "destructive" });
      return;
    }

    // Build responses payload
    const responses: Record<string, Array<{ question_text: string; selected_option: string; option_index: number }>> = {};
    const flatRespostas: Array<{ question: string; answer: string }> = [];
    
    for (const b of blocks) {
      responses[b.backendKey] = b.questions.map((q) => {
        const selectedValue = answers[q.id] ?? 1;
        const optionIndex = selectedValue - 1; // convert 1-5 to 0-4
        const selectedOption = q.options.find((o) => o.value === selectedValue)?.label || "";
        
        flatRespostas.push({
          question: q.text,
          answer: selectedOption,
        });
        
        return {
          question_text: q.text,
          selected_option: selectedOption,
          option_index: optionIndex,
        };
      });
    }

    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);

    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        email: trimmedEmail,
        responses,
        assessment_duration_seconds: durationSeconds,
      };
      // No auth — user_id not sent

      const totalScore = Object.values(responses).flat().reduce((sum: number, r: any) => sum + r.option_index, 0);
      const maxScore = Object.values(responses).flat().length * 4;
      const pct = Math.round((totalScore / maxScore) * 100);
      const maturityLevel = pct <= 20 ? "iniciante" : pct <= 40 ? "parcial" : pct <= 60 ? "em_evolucao" : pct <= 80 ? "avancado" : "lider";
      const data = { assessment_id: crypto.randomUUID(), total_score: pct, maturity_level: maturityLevel, success: true };

      // Envia diagnóstico por e-mail (não bloqueia a navegação em caso de falha)
      const recommendations = `Nível de maturidade: ${maturityLevel.replace("_", " ")}.\nScore: ${pct}/100.\n\nRecomendamos priorizar as dimensões com menor pontuação e estruturar um plano de evolução em dados, governança e casos de uso.`;
      try {
        await emailService.sendAssessment({
          nome: trimmedEmail.split("@")[0],
          email: trimmedEmail,
          resultado: `Nível: ${maturityLevel.replace("_", " ")} — Score: ${pct}/100`,
          recomendacoes: recommendations.split("\n").filter(Boolean),
          respostas: flatRespostas,
        });
        toast({ title: "Diagnóstico enviado", description: "Enviamos o resultado para o seu e-mail." });
      } catch (mailErr) {
        console.error("Falha ao enviar e-mail de diagnóstico:", mailErr);
        toast({
          title: "Não foi possível enviar o e-mail",
          description: "Você ainda pode visualizar o resultado nesta tela.",
          variant: "destructive",
        });
      }

      navigate(`/prontidao-ia/resultado?assessment_id=${data.assessment_id}`, {
        state: {
          assessment: {
            id: data.assessment_id,
            total_score: data.total_score,
            maturity_level: data.maturity_level,
            responses,
            email: trimmedEmail,
            created_at: new Date().toISOString(),
          },
        },
      });
    } catch (err) {
      console.error("Submit error:", err);
      toast({
        title: "Erro ao enviar avaliação",
        description: "Ocorreu um problema ao salvar sua avaliação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentQ < block.questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else if (currentBlock < blocks.length - 1) {
      setCurrentBlock((b) => b + 1);
      setCurrentQ(0);
    } else {
      // Last question — submit
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
    } else if (currentBlock > 0) {
      setCurrentBlock((b) => b - 1);
      setCurrentQ(blocks[currentBlock - 1].questions.length - 1);
    }
  };

  const isFirst = currentBlock === 0 && currentQ === 0;
  const isLast = currentBlock === blocks.length - 1 && currentQ === block.questions.length - 1;

  let flatIndex = 0;
  for (let b = 0; b < currentBlock; b++) flatIndex += blocks[b].questions.length;
  flatIndex += currentQ;

  /* ---------------------------------------------------------------- */
  /*  INTRO SCREEN                                                     */
  /* ---------------------------------------------------------------- */
  if (showIntro) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-navy-gradient">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-tech/[0.04] blur-[120px]" />
        <div className="absolute left-[5%] bottom-[10%] h-[250px] w-[250px] rounded-full bg-petrol/15 blur-[80px]" />

        <div className="container relative z-10 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              <BarChart3 className="mr-2 h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium tracking-wide text-accent">Prontidão para IA</span>
            </div>

            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
              Avaliação de maturidade{" "}
              <span className="text-gradient">de dados e IA</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
              Uma leitura estruturada para entender o estágio atual da sua empresa e identificar o quanto ela está preparada para evoluir com inteligência artificial.
            </p>

            {/* Email capture */}
            <div className="mx-auto mt-8 max-w-sm">
              <label className="mb-2 block text-left text-xs font-medium text-primary-foreground/60">
                Seu e-mail (para receber o resultado)
              </label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/30"
              />
            </div>

            {/* Meta badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-2.5">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium text-primary-foreground/70">3 a 5 minutos</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-2.5">
                <ListChecks className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium text-primary-foreground/70">{totalQuestions} perguntas</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-2.5">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium text-primary-foreground/70">Resultado ao final</span>
              </div>
            </div>

            {/* Blocks preview */}
            <div className="mx-auto mt-10 grid max-w-xl gap-3 text-left sm:grid-cols-2">
              {blocks.map((b, i) => (
                <div
                  key={b.id}
                  className="flex items-start gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/15 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-primary-foreground">{b.title}</p>
                    <p className="mt-0.5 text-xs text-primary-foreground/50">{b.questions.length} perguntas</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="mt-10 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => {
                startTimeRef.current = Date.now();
                setShowIntro(false);
              }}
              disabled={!email.trim()}
            >
              Iniciar avaliação
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-6">
              <Link
                to="/prontidao-ia"
                className="text-sm text-primary-foreground/40 underline underline-offset-4 transition-colors hover:text-accent"
              >
                Voltar para Prontidão para IA
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  QUESTIONNAIRE SCREEN                                             */
  /* ---------------------------------------------------------------- */
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-gradient">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute right-[10%] top-[15%] h-[350px] w-[350px] rounded-full bg-cyan-tech/[0.03] blur-[100px]" />
      <div className="absolute left-[5%] bottom-[15%] h-[200px] w-[200px] rounded-full bg-petrol/15 blur-[80px]" />

      <div className="container relative z-10 py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Top bar: block stepper */}
          <div className="mb-8">
            <div className="flex items-center gap-1.5">
              {blocks.map((b, i) => {
                const isActive = i === currentBlock;
                const isDone = i < currentBlock;
                return (
                  <div key={b.id} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className={`h-1 w-full rounded-full transition-all ${
                        isDone ? "bg-accent" : isActive ? "bg-accent/60" : "bg-primary-foreground/10"
                      }`}
                    />
                    <span
                      className={`hidden text-[10px] font-medium uppercase tracking-wider sm:block ${
                        isActive ? "text-accent" : isDone ? "text-accent/60" : "text-primary-foreground/30"
                      }`}
                    >
                      {b.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress info */}
          <div className="mb-6 flex items-center justify-between text-xs text-primary-foreground/50">
            <span className="font-medium text-accent">{block.title}</span>
            <span>
              Pergunta {flatIndex + 1} de {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="mb-10 h-1 bg-primary-foreground/10 [&>div]:bg-accent" />

          {/* Question card */}
          <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm md:p-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
              {block.subtitle}
            </p>
            <h2 className="font-display text-lg font-bold leading-snug text-primary-foreground md:text-xl">
              {question?.text}
            </h2>

            <RadioGroup
              value={answers[question?.id ?? ""]?.toString() ?? ""}
              onValueChange={handleSelect}
              className="mt-8 space-y-3"
            >
              {question?.options.map((opt) => {
                const isSelected = answers[question.id] === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-start gap-4 rounded-xl border p-5 transition-all ${
                      isSelected
                        ? "border-accent/50 bg-accent/10"
                        : "border-primary-foreground/10 bg-primary-foreground/[0.02] hover:border-primary-foreground/20 hover:bg-primary-foreground/5"
                    }`}
                  >
                    <RadioGroupItem
                      value={opt.value.toString()}
                      id={`${question.id}-${opt.value}`}
                      className="mt-0.5 shrink-0"
                    />
                    <Label
                      htmlFor={`${question.id}-${opt.value}`}
                      className="cursor-pointer text-sm leading-relaxed text-primary-foreground/80 md:text-base"
                    >
                      {opt.label}
                    </Label>
                  </label>
                );
              })}
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              className="text-primary-foreground/50 hover:text-primary-foreground"
              onClick={handleBack}
              disabled={isFirst}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={!canAdvance || submitting}
              onClick={handleNext}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : isLast ? (
                <>
                  Ver diagnóstico
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvaliacaoIAPage;
