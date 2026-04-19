import { ArrowRight, ChevronRight, Shield, FileText, Search, ClipboardCheck, Cloud, Users, AlertTriangle, Zap, Eye, Lock, TrendingUp, RefreshCw, Settings, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/* ───────────────────────────── 1. Hero ───────────────────────────── */
const AvalaraHero = () => (
  <section className="relative overflow-hidden bg-navy-gradient">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
    <div className="absolute inset-0">
      <div className="absolute left-[15%] top-0 h-full w-px bg-gradient-to-b from-transparent via-orange-accent/[0.07] to-transparent" />
      <div className="absolute left-[50%] top-0 h-full w-px bg-gradient-to-b from-transparent via-orange-accent/[0.05] to-transparent" />
      <div className="absolute left-[80%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech/[0.03] to-transparent" />
      <div className="absolute left-0 top-[40%] h-px w-full bg-gradient-to-r from-transparent via-orange-accent/[0.06] to-transparent" />
      <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-orange-accent/[0.04] blur-[120px]" />
      <div className="absolute left-[5%] bottom-[10%] h-[250px] w-[250px] rounded-full bg-petrol/15 blur-[80px]" />
    </div>

    <div className="container relative z-10 py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-orange-accent/40 bg-orange-accent/10 px-4 py-1.5">
          <span className="text-xs font-medium tracking-wide text-orange-accent">Soluções Fiscais com Avalara</span>
        </div>

        <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          A reforma tributária não vai esperar{" "}
          <span className="bg-gradient-to-r from-orange-accent to-orange-accent-subtle bg-clip-text text-transparent">
            a sua operação se organizar.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
          As soluções fiscais com Avalara ajudam sua empresa a automatizar rotinas críticas, reduzir exposição e se preparar com mais segurança para um novo cenário tributário que exigirá adaptação real até 2027.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/50 md:text-base">
          Quando a legislação muda, o impacto não fica apenas no fiscal. Ele alcança processos, sistemas, documentos, governança, apuração, compliance e capacidade operacional. A pergunta não é se sua empresa será afetada. É o quão preparada ela estará para responder.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-orange-accent text-white hover:bg-orange-accent/90" asChild>
            <Link to="/contato">
              Fale com um especialista
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            className="bg-orange-accent text-white hover:bg-orange-accent/90"
            asChild
          >
            <Link to="/contato">
              Avalie a prontidão fiscal da sua operação
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            "Automação fiscal com mais controle",
            "Compliance com mais consistência",
            "Preparação para adaptação tributária",
            "Precisão operacional em escala",
          ].map((proof) => (
            <div key={proof} className="rounded-lg border border-orange-accent/15 bg-primary-foreground/[0.03] px-4 py-3">
              <p className="text-xs font-medium leading-snug text-primary-foreground/60">{proof}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
  </section>
);

/* ───────────── 2. A pergunta que precisa ser feita ───────────── */
const PerguntaQueDeveSerFeita = () => {
  const provocacoes = [
    { icon: Settings, text: "Seu cálculo tributário acompanha a complexidade que está vindo?" },
    { icon: FileText, text: "Seus documentos e obrigações estão preparados para mudar com segurança?" },
    { icon: AlertTriangle, text: "Sua operação depende demais de controles manuais?" },
    { icon: Eye, text: "Sua empresa tem visibilidade suficiente para adaptar processos antes da pressão aumentar?" },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-2 inline-block h-1 w-10 rounded-full bg-orange-accent" />
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Sua empresa está tratando a reforma tributária como{" "}
            <span className="text-orange-accent">prioridade estratégica</span> ou como ajuste de última hora?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            A mudança do ambiente tributário brasileiro exige mais do que leitura normativa. Ela exige adaptação operacional, revisão de processos, inteligência sobre dados fiscais, confiabilidade na determinação de tributos e capacidade de resposta contínua. Quanto mais a empresa demora para estruturar essa base, maior tende a ser o custo da reação.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {provocacoes.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="group relative rounded-xl border border-border bg-card p-7 transition-all hover:border-orange-accent/30 hover:shadow-lg"
            >
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-orange-accent/60 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-accent/10">
                <Icon className="h-5 w-5 text-orange-accent" />
              </div>
              <p className="text-sm font-medium leading-relaxed text-card-foreground md:text-base">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────── 3. Por que isso importa agora ───────────── */
const PorQueImportaAgora = () => {
  const destaques = [
    { icon: Zap, label: "Menos improviso" },
    { icon: Eye, label: "Mais previsibilidade" },
    { icon: RefreshCw, label: "Mais capacidade de adaptação" },
    { icon: Shield, label: "Menos risco operacional" },
    { icon: Lock, label: "Mais confiança na execução" },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-accent">
            <span className="h-px w-6 bg-orange-accent" />
            Urgência estratégica
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            2027 não é um detalhe no calendário.{" "}
            <span className="text-orange-accent">É um marco que exige preparação concreta.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            A adaptação ao novo cenário tributário não deve começar quando a pressão estiver no limite. Empresas que se movem cedo ganham tempo para revisar processos, reduzir improviso, ajustar sistemas e construir uma operação fiscal mais preparada para responder com segurança, escala e consistência.
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-4">
          {destaques.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-sm"
            >
              <Icon className="h-4 w-4 text-orange-accent" />
              <span className="text-sm font-medium text-card-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────── 4. O que a Avalara ajuda a resolver ───────────── */
const OQueAvalaraResolve = () => {
  const blocos = [
    { icon: Settings, title: "Cálculo e determinação de tributos", desc: "Mais precisão na determinação tributária para reduzir ruído, retrabalho e exposição desnecessária." },
    { icon: FileText, title: "Emissão de documentos fiscais", desc: "Mais consistência operacional para sustentar emissão com segurança e aderência ao ambiente regulatório." },
    { icon: Search, title: "Captura de documentos fiscais", desc: "Melhor visibilidade e organização de informações para ampliar controle e confiabilidade da operação." },
    { icon: ClipboardCheck, title: "Administração de obrigações fiscais", desc: "Mais estrutura para lidar com exigências recorrentes sem depender excessivamente de rotinas manuais e fragmentadas." },
    { icon: Cloud, title: "Compliance fiscal em nuvem", desc: "Mais agilidade, escalabilidade e capacidade de adaptação em uma jornada de conformidade contínua." },
    { icon: Users, title: "BPO e suporte especializado", desc: "Apoio para empresas que precisam reforçar capacidade fiscal com mais inteligência e menos sobrecarga operacional." },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Mais do que acompanhar exigências fiscais, sua operação precisa{" "}
            <span className="text-accent">ganhar capacidade para responder melhor.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Com Avalara, a Financeit ajuda empresas a fortalecer uma estrutura fiscal mais preparada para lidar com cálculo, documentos, compliance, obrigações e mudanças regulatórias com mais automação, precisão e controle.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blocos.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-orange-accent/25 hover:shadow-lg"
            >
              <div className="absolute right-6 top-6 h-8 w-8 rounded-full bg-orange-accent/[0.06]" />
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-accent/10">
                <Icon className="h-5 w-5 text-orange-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────── 5. A reforma tributária muda o jogo ───────────── */
const ReformaMudaOJogo = () => {
  const mudancas = [
    { icon: RefreshCw, label: "Mudança tributária é também mudança de processo" },
    { icon: Settings, label: "Mudança tributária é também mudança de sistema" },
    { icon: Shield, label: "Mudança tributária é também mudança de governança" },
    { icon: Zap, label: "Mudança tributária é também mudança de execução" },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute right-[5%] top-[15%] h-[350px] w-[350px] rounded-full bg-orange-accent/[0.05] blur-[100px]" />
      <div className="absolute left-[10%] bottom-[10%] h-[200px] w-[200px] rounded-full bg-petrol/10 blur-[80px]" />

      <div className="container relative z-10 py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block h-1.5 w-12 rounded-full bg-orange-accent" />
          <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            O desafio não é apenas entender a reforma.{" "}
            <span className="bg-gradient-to-r from-orange-accent to-orange-accent-subtle bg-clip-text text-transparent">
              É conseguir operar dentro dela.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
            Nos próximos anos, empresas de diferentes portes terão que conviver com um ambiente de adaptação tributária que exigirá revisão de regras, processos, parametrizações, documentos, rotinas e controles. O risco está em tratar essa transformação como pauta secundária, quando na prática ela pode redefinir o nível de eficiência, segurança e capacidade de resposta da operação.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {mudancas.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-7 backdrop-blur-sm"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-orange-accent/70" />
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-accent/15">
                  <Icon className="h-5 w-5 text-orange-accent" />
                </div>
                <p className="text-sm font-semibold leading-relaxed text-primary-foreground/90 md:text-base">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-primary-foreground/50 md:text-base">
          Quem chegar a 2027 sem base organizada tende a enfrentar mais fricção, mais risco e menos capacidade de reação.
        </p>
      </div>
    </section>
  );
};

/* ───────────── 6. O papel da Financeit ───────────── */
const PapelFinanceit = () => {
  const pontos = [
    "Leitura do contexto de negócio",
    "Conexão entre solução e operação real",
    "Apoio na jornada de adaptação",
    "Visão estruturada para evolução fiscal com mais segurança",
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-accent">
              <span className="h-px w-6 bg-orange-accent" />
              O papel da Financeit
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
              A tecnologia importa. Mas a forma de estruturar a adoção{" "}
              <span className="text-accent">faz toda a diferença.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              A Financeit atua para conectar a capacidade da Avalara à realidade operacional de cada empresa. Isso significa ajudar a transformar solução fiscal em aplicação prática, aderente ao contexto, com mais clareza, prioridade e direcionamento na adaptação da operação.
            </p>
          </div>

          <div className="space-y-4">
            {pontos.map((ponto, i) => (
              <div
                key={ponto}
                className="flex items-center gap-4 rounded-xl border border-border bg-card px-6 py-5 transition-all hover:border-orange-accent/20 hover:shadow-sm"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-accent/10">
                  <span className="text-xs font-bold text-orange-accent">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-sm font-medium text-card-foreground md:text-base">{ponto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────── 7. Para empresas que precisam ───────────── */
const ParaEmpresasAvalara = () => {
  const necessidades = [
    "Reduzir dependência de controles fiscais manuais",
    "Ampliar automação com mais confiabilidade",
    "Reforçar compliance e capacidade de resposta",
    "Preparar a operação para a reforma tributária",
    "Ganhar mais precisão em cálculo e documentos fiscais",
    "Evoluir com mais segurança até 2027",
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Esta solução faz sentido para{" "}
            <span className="text-orange-accent">empresas que precisam:</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-2xl space-y-3">
          {necessidades.map((n) => (
            <div
              key={n}
              className="flex items-center gap-4 rounded-lg border border-border bg-card px-6 py-4 transition-all hover:border-orange-accent/20 hover:shadow-sm"
            >
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-orange-accent" />
              <p className="text-sm font-medium text-card-foreground md:text-base">{n}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────── 8. O que muda quando a estrutura fiscal evolui ───────────── */
const OQueMudaFiscal = () => {
  const beneficios = [
    { icon: Shield, label: "Mais controle" },
    { icon: Search, label: "Mais precisão" },
    { icon: TrendingUp, label: "Mais escalabilidade" },
    { icon: Lock, label: "Mais segurança operacional" },
    { icon: RefreshCw, label: "Mais capacidade de adaptação" },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Quando a estrutura fiscal ganha inteligência,{" "}
            <span className="text-accent">a empresa responde melhor.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            A evolução fiscal não deve ser vista apenas como obrigação. Quando a operação ganha mais automação, consistência e visibilidade, a empresa reduz atrito, melhora previsibilidade, fortalece conformidade e aumenta a confiança para operar em um ambiente regulatório mais exigente.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {beneficios.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-orange-accent/20 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-accent/10">
                <Icon className="h-5 w-5 text-orange-accent" />
              </div>
              <p className="text-sm font-semibold text-card-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────── 9. Diferencial da abordagem ───────────── */
const DiferencialAbordagemAvalara = () => {
  const diferenciais = [
    { icon: Layers, title: "Tecnologia com aplicação prática" },
    { icon: Settings, title: "Automação com contexto" },
    { icon: Shield, title: "Compliance com mais inteligência" },
    { icon: RefreshCw, title: "Adaptação com menos improviso" },
    { icon: TrendingUp, title: "Preparo real para um novo ciclo tributário" },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-accent">
            <span className="h-px w-6 bg-orange-accent" />
            Diferencial
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Não se trata apenas de software fiscal.{" "}
            <span className="text-orange-accent">Trata-se de preparar a operação para responder melhor.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            A combinação entre Financeit e Avalara permite olhar para a agenda fiscal não apenas como obrigação técnica, mas como frente crítica de estrutura, eficiência e resiliência operacional. É essa leitura que transforma adequação em vantagem de preparo.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-xl border border-border bg-card p-7 transition-all hover:border-orange-accent/25 hover:shadow-md"
            >
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-orange-accent/40 via-orange-accent/20 to-transparent" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-accent/10">
                <Icon className="h-5 w-5 text-orange-accent" />
              </div>
              <h3 className="font-display text-base font-bold text-card-foreground">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────── 10. CTA final ───────────── */
const AvalaraCTAFinal = () => (
  <section className="relative overflow-hidden bg-navy-gradient">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
    <div className="absolute right-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-orange-accent/[0.06] blur-[100px]" />

    <div className="container relative z-10 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-block h-1.5 w-12 rounded-full bg-orange-accent" />
        <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
          A pergunta não é se a sua empresa terá que se adaptar.{" "}
          <span className="bg-gradient-to-r from-orange-accent to-orange-accent-subtle bg-clip-text text-transparent">
            A pergunta é se ela vai chegar preparada.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
          Com as soluções fiscais com Avalara e o direcionamento da Financeit, sua empresa pode avançar com mais clareza, automação, conformidade e segurança em uma agenda que tende a ganhar ainda mais peso até 2027.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-orange-accent text-white hover:bg-orange-accent/90" asChild>
            <Link to="/contato">
              Solicite uma conversa estratégica
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            className="bg-orange-accent text-white hover:bg-orange-accent/90"
            asChild
          >
            <Link to="/contato">
              Entenda como preparar sua operação
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

import AvalaraFAQ from "@/components/sections/avalara/AvalaraFAQ";

/* ───────────── Page ───────────── */
const AvalaraPage = () => (
  <>
    <AvalaraHero />
    <PerguntaQueDeveSerFeita />
    <PorQueImportaAgora />
    <OQueAvalaraResolve />
    <ReformaMudaOJogo />
    <PapelFinanceit />
    <ParaEmpresasAvalara />
    <OQueMudaFiscal />
    <DiferencialAbordagemAvalara />
    <AvalaraFAQ />
    <AvalaraCTAFinal />
  </>
);

export default AvalaraPage;
