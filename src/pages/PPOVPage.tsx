import {
  ArrowRight,
  ChevronRight,
  BarChart3,
  FileSpreadsheet,
  Layers,
  Zap,
  TrendingUp,
  Database,
  AlertTriangle,
  Clock,
  HelpCircle,
  ShieldCheck,
  Eye,
  RefreshCw,
  Target,
  CheckCircle2,
  Gauge,
  Link2,
  GitMerge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/* ───────────────────────────── 1. Hero ───────────────────────────── */
const PPOVHero = () => (
  <section className="relative overflow-hidden bg-navy-gradient">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
    <div className="absolute inset-0">
      <div className="absolute left-[15%] top-0 h-full w-px bg-gradient-to-b from-transparent via-green-accent/[0.08] to-transparent" />
      <div className="absolute left-[50%] top-0 h-full w-px bg-gradient-to-b from-transparent via-green-accent/[0.05] to-transparent" />
      <div className="absolute left-[80%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech/[0.03] to-transparent" />
      <div className="absolute left-0 top-[40%] h-px w-full bg-gradient-to-r from-transparent via-green-accent/[0.06] to-transparent" />
      <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-green-accent/[0.05] blur-[120px]" />
      <div className="absolute left-[5%] bottom-[10%] h-[250px] w-[250px] rounded-full bg-petrol/15 blur-[80px]" />
    </div>

    <div className="container relative z-10 py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-green-accent/40 bg-green-accent/10 px-4 py-1.5">
          <span className="text-xs font-medium tracking-wide text-green-accent">Gestão de Orçamento e Resultado com PPOV</span>
        </div>

        <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          Sua operação financeira não pode continuar convivendo com{" "}
          <span className="bg-gradient-to-r from-green-accent to-green-accent-subtle bg-clip-text text-transparent">
            versões diferentes da verdade.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
          A gestão de orçamento e resultado com PPOV ajuda sua empresa a integrar dados, automatizar processos e construir uma única fonte da verdade para decisões mais rápidas, corretas e consistentes.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/50 md:text-base">
          Quando orçamento, realizado, projeções e análises dependem de múltiplas bases, planilhas paralelas e conciliações manuais, a empresa perde velocidade, confiança e capacidade de resposta. O problema não está apenas no trabalho do time. Está na estrutura da informação.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-green-accent text-white hover:bg-green-accent/90" asChild>
            <Link to="/contato">
              Fale com um especialista
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-green-accent text-white hover:bg-green-accent/90"
            asChild
          >
            <Link to="/contato">
              Avalie a maturidade da sua gestão financeira
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Link2, text: "Mais integração entre orçamento e resultado" },
            { icon: Zap, text: "Mais agilidade na leitura financeira" },
            { icon: ShieldCheck, text: "Mais consistência para decisão executiva" },
            { icon: Database, text: "Uma única fonte da verdade" },
          ].map((item) => (
            <div key={item.text} className="flex flex-col items-center gap-2 rounded-lg border border-green-accent/20 bg-green-accent/5 px-4 py-5">
              <item.icon className="h-5 w-5 text-green-accent" />
              <span className="text-center text-xs font-medium leading-snug text-primary-foreground/70">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ──── 2. A pergunta que a liderança financeira precisa encarar ──── */
const PerguntaLideranca = () => (
  <section className="section-padding">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
          Sua área financeira entrega inteligência para decidir ou{" "}
          <span className="text-green-accent">esforço para reconciliar números?</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Em muitas empresas, boa parte da energia da área financeira ainda é consumida consolidando bases, conferindo versões, ajustando planilhas e explicando divergências. Esse esforço pode até manter a operação funcionando, mas reduz a capacidade da liderança de enxergar com clareza, responder rápido e sustentar decisões com confiança.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
        {[
          { icon: Clock, text: "Seus números fecham rápido ou apenas fecham depois de muito retrabalho?" },
          { icon: GitMerge, text: "O orçamento conversa com o realizado com consistência?" },
          { icon: Eye, text: "Sua liderança olha para a mesma verdade ou para versões concorrentes?" },
          { icon: HelpCircle, text: "Seu time financeiro gera direção ou absorve ruído operacional?" },
        ].map((item) => (
          <div
            key={item.text}
            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-green-accent/30 hover:shadow-lg"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-green-accent/20 bg-green-accent/10">
              <item.icon className="h-5 w-5 text-green-accent" />
            </div>
            <p className="text-sm font-medium leading-relaxed text-card-foreground md:text-base">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ──── 3. Por que a única fonte da verdade se tornou indispensável ──── */
const FonteVerdade = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
          Sem uma única fonte da verdade, velocidade e confiança financeira{" "}
          <span className="text-green-accent">passam a competir entre si.</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Quando os dados financeiros estão fragmentados, a empresa enfrenta um dilema permanente: ou acelera com risco de inconsistência, ou tenta garantir precisão à custa de tempo, energia e retrabalho. Soluções integradas e automatizadas eliminam esse falso dilema ao permitir mais velocidade com mais confiança.
        </p>
      </div>

      <div className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-3">
        {[
          "menos reconciliação manual",
          "mais consistência entre orçamento e realizado",
          "mais confiança para reportes executivos",
          "mais velocidade para responder ao negócio",
          "mais previsibilidade para acompanhar resultado",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-full border border-green-accent/20 bg-green-accent/5 px-5 py-2.5"
          >
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-accent" />
            <span className="text-sm font-medium text-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ──── 4. O que a PPOV ajuda a estruturar ──── */
const PPOVSolucoes = () => {
  const blocos = [
    { icon: Target, title: "Planejamento orçamentário integrado", desc: "Mais alinhamento entre premissas, metas e acompanhamento, com menos dependência de bases dispersas." },
    { icon: BarChart3, title: "Acompanhamento de realizado versus orçamento", desc: "Mais clareza para comparar desempenho e identificar desvios com agilidade e consistência." },
    { icon: Layers, title: "Consolidação de informações financeiras", desc: "Mais estrutura para reduzir divergências entre fontes e sustentar leitura executiva com confiança." },
    { icon: Zap, title: "Automatização de rotinas críticas", desc: "Menos retrabalho manual e mais capacidade de resposta para uma área financeira que precisa operar com precisão." },
    { icon: Gauge, title: "Gestão de desempenho e resultado", desc: "Mais visibilidade para acompanhar indicadores e apoiar decisões orientadas por impacto real." },
    { icon: Database, title: "Base confiável para decisões executivas", desc: "Uma única fonte da verdade para reduzir ruído, acelerar entendimento e melhorar a qualidade da decisão." },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Mais do que organizar números, sua empresa precisa estruturar{" "}
            <span className="text-green-accent">inteligência financeira confiável.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Com PPOV, a Financeit ajuda empresas a fortalecer uma estrutura de orçamento e resultado mais integrada, automatizada e consistente, reduzindo ruído entre áreas, acelerando análises e ampliando a confiabilidade da informação usada para decidir.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blocos.map((b) => (
            <div
              key={b.title}
              className="group rounded-xl border border-border bg-card p-7 transition-all hover:border-green-accent/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-green-accent/20 bg-green-accent/10">
                <b.icon className="h-5 w-5 text-green-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ──── 5. O custo invisível da fragmentação ──── */
const CustoFragmentacao = () => (
  <section className="relative overflow-hidden bg-navy-gradient">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
    <div className="absolute inset-0">
      <div className="absolute right-[15%] top-[15%] h-[350px] w-[350px] rounded-full bg-green-accent/[0.04] blur-[120px]" />
      <div className="absolute left-[10%] bottom-[20%] h-[200px] w-[200px] rounded-full bg-destructive/[0.03] blur-[80px]" />
    </div>

    <div className="container relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
          O maior risco não é apenas errar o número.{" "}
          <span className="bg-gradient-to-r from-green-accent to-green-accent-subtle bg-clip-text text-transparent">
            É normalizar a dúvida sobre ele.
          </span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-primary-foreground/70 md:text-lg">
          Quando orçamento, resultado e análises dependem de múltiplas versões, o problema deixa de ser apenas operacional. Ele se torna um problema de confiança, velocidade e governança. A liderança perde tempo validando base, o time perde energia reconciliando informação e a empresa passa a decidir com mais fricção do que deveria.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: RefreshCw, label: "Fragmentação gera retrabalho" },
          { icon: Clock, label: "Fragmentação gera lentidão" },
          { icon: AlertTriangle, label: "Fragmentação gera dúvida" },
          { icon: TrendingUp, label: "Fragmentação reduz qualidade da decisão" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-accent/30 bg-green-accent/10">
              <item.icon className="h-5 w-5 text-green-accent" />
            </div>
            <span className="text-sm font-semibold text-primary-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-base font-medium italic text-primary-foreground/60 md:text-lg">
        Uma empresa não deveria depender de esforço heroico da área financeira para chegar ao número certo.
      </p>
    </div>
  </section>
);

/* ──── 6. O papel da Financeit ──── */
const PapelFinanceit = () => (
  <section className="section-padding">
    <div className="container">
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
              A tecnologia organiza a informação. A estrutura certa transforma isso em{" "}
              <span className="text-green-accent">capacidade de gestão.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              A Financeit atua para conectar a capacidade da PPOV à realidade financeira e operacional de cada empresa. Isso significa traduzir solução em uso prático, aderente ao contexto, com mais clareza, direção e impacto na rotina de decisão.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Leitura do contexto financeiro da empresa",
              "Conexão entre solução e operação real",
              "Apoio na estruturação da jornada",
              "Visão aplicada para consolidar uma base mais confiável",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-lg border border-border bg-card px-6 py-4 transition-all hover:border-green-accent/20 hover:shadow-sm"
              >
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-green-accent" />
                <span className="text-sm font-medium text-card-foreground md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ──── 7. Para empresas que precisam ──── */
const ParaEmpresas = () => {
  const lista = [
    "Integrar orçamento, realizado e análise em uma base mais confiável",
    "Reduzir dependência de planilhas e consolidações paralelas",
    "Acelerar fechamento, leitura e resposta executiva",
    "Aumentar consistência nos dados apresentados à liderança",
    "Construir uma única fonte da verdade",
    "Decidir com mais confiança, velocidade e coerência",
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Esta solução faz sentido para{" "}
            <span className="text-green-accent">empresas que precisam:</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-2xl space-y-3">
          {lista.map((n, i) => (
            <div
              key={n}
              className="flex items-center gap-4 rounded-lg border border-border bg-card px-6 py-4 transition-all hover:border-green-accent/20 hover:shadow-sm"
            >
              <ArrowRight className={`h-4 w-4 flex-shrink-0 ${i === 4 ? "text-green-accent" : "text-accent"}`} />
              <p className="text-sm font-medium text-card-foreground md:text-base">{n}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ──── 8. O que muda quando a gestão financeira ganha estrutura ──── */
const OQueMuda = () => (
  <section className="section-padding">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
          Quando a gestão financeira ganha consistência,{" "}
          <span className="text-green-accent">a liderança responde melhor.</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Com uma base mais integrada, automatizada e confiável, a área financeira deixa de concentrar energia em reconciliar informação e passa a ampliar sua capacidade de leitura, antecipação e direção. O resultado é uma empresa com mais clareza para agir, corrigir rota e sustentar decisões relevantes.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-5">
        {[
          { icon: ShieldCheck, label: "mais controle" },
          { icon: Zap, label: "mais velocidade" },
          { icon: Layers, label: "mais consistência" },
          { icon: Eye, label: "mais previsibilidade" },
          { icon: TrendingUp, label: "mais confiança na decisão" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-3 rounded-xl border border-green-accent/15 bg-green-accent/5 p-5 text-center"
          >
            <item.icon className="h-5 w-5 text-green-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ──── 9. Diferencial da abordagem ──── */
const DiferencialAbordagem = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
          Não se trata apenas de acompanhar orçamento. Trata-se de{" "}
          <span className="text-green-accent">governar a empresa com uma base confiável.</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          A combinação entre Financeit e PPOV permite olhar para orçamento e resultado não como rotina isolada da área financeira, mas como infraestrutura crítica de clareza, governança e decisão. É essa leitura que transforma informação dispersa em capacidade executiva real.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-5">
        {[
          "integração com propósito",
          "automação com consistência",
          "leitura financeira com mais confiança",
          "menos ruído entre áreas e versões",
          "uma única fonte da verdade para decidir melhor",
        ].map((item) => (
          <div
            key={item}
            className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-5 text-center transition-all hover:border-green-accent/25 hover:shadow-sm"
          >
            <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-green-accent to-green-accent-subtle" />
            <span className="text-sm font-medium text-card-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ──── 10. CTA final ──── */
const PPOVCTAFinal = () => (
  <section className="relative overflow-hidden bg-navy-gradient">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-accent/[0.04] blur-[150px]" />
    </div>

    <div className="container relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
          A questão não é mais se sua empresa precisa de mais dados. É se ela já consegue{" "}
          <span className="bg-gradient-to-r from-green-accent to-green-accent-subtle bg-clip-text text-transparent">
            confiar plenamente nos dados que usa para decidir.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
          Com a gestão de orçamento e resultado com PPOV e o direcionamento da Financeit, sua empresa pode avançar para uma operação financeira mais integrada, automatizada e confiável — com uma única fonte da verdade para sustentar decisões rápidas, corretas e consistentes.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-green-accent text-white hover:bg-green-accent/90" asChild>
            <Link to="/contato">
              Solicite uma conversa estratégica
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-green-accent text-white hover:bg-green-accent/90"
            asChild
          >
            <Link to="/contato">
              Entenda como estruturar uma única fonte da verdade
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

/* ──────────────── Page ──────────────── */
import PpovFAQ from "@/components/sections/ppov/PpovFAQ";

const PPOVPage = () => (
  <>
    <PPOVHero />
    <PerguntaLideranca />
    <FonteVerdade />
    <PPOVSolucoes />
    <CustoFragmentacao />
    <PapelFinanceit />
    <ParaEmpresas />
    <OQueMuda />
    <DiferencialAbordagem />
    <PpovFAQ />
    <PPOVCTAFinal />
  </>
);

export default PPOVPage;
