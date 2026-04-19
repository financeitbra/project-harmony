import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Eye,
  Target,
  BarChart3,
  Compass,
  AlertTriangle,
  Layers,
  TrendingUp,
  ShieldCheck,
  Network,
  Search,
  BrainCircuit,
} from "lucide-react";

/* ── data ── */

const microprovas = [
  { icon: Eye, text: "Mais clareza para decidir" },
  { icon: Target, text: "Menos ruído na leitura executiva" },
  { icon: Network, text: "Dados conectados à realidade do negócio" },
  { icon: Compass, text: "Informação transformada em direção" },
];

const blocosProblema = [
  { icon: BarChart3, text: "Relatórios demais podem esconder decisão de menos" },
  { icon: AlertTriangle, text: "Indicadores sem contexto geram interpretação instável" },
  { icon: Layers, text: "Bases desconectadas produzem leituras conflitantes" },
  { icon: Search, text: "Informação em excesso também pode ser ruído" },
];

const pilares = [
  { icon: Layers, titulo: "Dados com contexto" },
  { icon: Eye, titulo: "Leitura com critério" },
  { icon: ShieldCheck, titulo: "Decisão com base confiável" },
  { icon: BrainCircuit, titulo: "Execução orientada por inteligência" },
];

const blocosTravam = [
  { icon: Layers, text: "Dados fragmentados entre áreas" },
  { icon: Target, text: "Indicadores sem alinhamento executivo" },
  { icon: AlertTriangle, text: "Dificuldade de transformar análise em ação" },
  { icon: Search, text: "Excesso de esforço para chegar a uma leitura confiável" },
];

const beneficios = [
  "Mais clareza",
  "Mais coerência",
  "Mais velocidade para decidir",
  "Mais confiança na leitura",
  "Mais capacidade de resposta",
];

const frentes = [
  { icon: Layers, titulo: "Estruturação de bases e leituras" },
  { icon: Network, titulo: "Conexão entre dados e contexto de negócio" },
  { icon: ShieldCheck, titulo: "Apoio à governança e consistência da informação" },
  { icon: TrendingUp, titulo: "Integração entre análise, decisão e execução" },
];

const listaPrecisam = [
  "Reduzir ruído na leitura executiva",
  "Integrar informação com mais consistência",
  "Tomar decisões com base mais confiável",
  "Transformar análise em direção prática",
  "Fortalecer a conexão entre dados e ação",
  "Amadurecer a inteligência do negócio com critério",
];

const diferenciais = [
  { titulo: "Menos dashboard por si só", destaque: "mais leitura executiva útil" },
  { titulo: "Menos dado solto", destaque: "mais contexto" },
  { titulo: "Menos análise desconectada", destaque: "mais direção" },
  { titulo: "Menos ruído", destaque: "mais inteligência aplicada" },
  { titulo: "Menos abstração", destaque: "mais capacidade real de resposta" },
];

/* ── page ── */

const InteligenciaNegocioPage = () => {
  return (
    <div className="bg-background">
      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-navy-gradient text-primary-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="relative section-padding">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-glow">
                <span className="h-px w-6 bg-cyan-glow" />
                Inteligência de Negócio
              </span>

              <h1 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl xl:text-[3.25rem] xl:leading-[1.15]">
                Inteligência de negócio não é ter mais dados.{" "}
                <span className="text-gradient">É conseguir responder melhor com eles.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-primary-foreground/90 md:text-xl">
                A Financeit ajuda empresas a transformar informação em leitura mais clara, direção mais consistente e capacidade real de decisão e execução.
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/70 md:text-base">
                Quando os dados estão dispersos, os indicadores não conversam e a leitura depende de esforço excessivo, a empresa até enxerga números — mas não necessariamente enxerga melhor. Inteligência de negócio começa quando a informação passa a servir à clareza, e não ao ruído.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to="/solucoes">
                    Conheça nossas soluções <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to="/contato">Fale com a Financeit</Link>
                </Button>
              </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {microprovas.map((m) => (
                <div key={m.text} className="flex flex-col items-center gap-2 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-4 text-center">
                  <m.icon className="h-5 w-5 text-cyan-glow" />
                  <span className="text-xs font-medium leading-snug text-primary-foreground/80">{m.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2 — O problema não é falta de dado */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" />
              Provocação
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Muitas empresas não sofrem por falta de informação.{" "}
              <span className="text-accent">Sofrem por falta de leitura confiável.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Ao longo do tempo, organizações acumulam bases, relatórios, sistemas e indicadores. Mas acumular informação não equivale a construir inteligência. Sem contexto, governança, integração e critério, os dados deixam de orientar e passam a competir entre si.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            {blocosProblema.map((b) => (
              <div key={b.text} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/20 hover:shadow-sm">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${b.text.includes('Relatórios') ? 'bg-orange-accent/10' : 'bg-accent/10'}`}>
                  <b.icon className={`h-5 w-5 ${b.text.includes('Relatórios') ? 'text-orange-accent' : 'text-accent'}`} />
                </div>
                <p className="text-sm font-medium text-card-foreground md:text-base">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — O que a Financeit entende por inteligência de negócio */}
      <section className="section-padding bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" />
              Nossa visão
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Para a Financeit, inteligência de negócio é a capacidade de transformar informação em{" "}
              <span className="text-accent">leitura útil, decisão melhor e execução mais coerente.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Isso exige mais do que tecnologia analítica. Exige estrutura de dados, integração, governança, consistência de leitura e conexão entre o que a empresa mede, o que ela entende e o que ela decide fazer a partir disso.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pilares.map((p) => (
              <div key={p.titulo} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-accent/20 hover:shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <p.icon className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm font-semibold text-card-foreground">{p.titulo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Onde as empresas travam */}
      <section className="relative overflow-hidden section-padding bg-navy-gradient text-primary-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-glow">
              <span className="h-px w-6 bg-cyan-glow" />
              Desafio
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Na prática, o bloqueio raramente está em coletar dados.{" "}
              <span className="text-gradient">Está em conseguir confiar, interpretar e agir.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              É comum que empresas tenham informação disponível, mas ainda enfrentem dificuldades para consolidar visão, reduzir contradições, conectar indicadores ao contexto real e transformar leitura analítica em direção executiva. Sem essa ponte, a inteligência não se completa.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            {blocosTravam.map((b) => (
              <div key={b.text} className="flex items-center gap-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-glow/10">
                  <b.icon className="h-5 w-5 text-cyan-glow" />
                </div>
                <p className="text-sm font-medium text-primary-foreground/85 md:text-base">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — O que muda quando a inteligência de negócio amadurece */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" />
              Transformação
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Quando a inteligência de negócio amadurece, a empresa para de apenas acompanhar números e{" "}
              <span className="text-accent">passa a responder melhor ao negócio.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Com uma base mais estruturada, leituras mais consistentes e decisões melhor sustentadas, a organização ganha mais clareza para priorizar, corrigir rota, antecipar movimentos e operar com menos fricção entre análise e execução.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-2xl space-y-3">
            {beneficios.map((b, i) => (
              <div key={b} className="flex items-center gap-4 rounded-lg border border-border bg-card px-6 py-4 transition-all hover:border-accent/20 hover:shadow-sm">
                <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${i === 0 ? 'bg-orange-accent/10' : 'bg-accent/10'} text-xs font-bold ${i === 0 ? 'text-orange-accent' : 'text-accent'}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-medium text-card-foreground md:text-base">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Como a Financeit atua */}
      <section className="section-padding bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" />
              Atuação
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              A atuação da Financeit conecta inteligência de negócio à{" "}
              <span className="text-accent">realidade operacional da empresa.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Nossa abordagem considera que inteligência de negócio não pode ser tratada como camada isolada. Ela precisa dialogar com talentos, tecnologia, dados, governança, IA, execução e soluções especializadas, para que a leitura produzida tenha utilidade real no ambiente de decisão.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {frentes.map((f) => (
              <div key={f.titulo} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-accent/20 hover:shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <f.icon className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm font-semibold text-card-foreground">{f.titulo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Para empresas que precisam */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Esta frente faz sentido para empresas que{" "}
              <span className="text-accent">precisam:</span>
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-2">
            {listaPrecisam.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4 transition-all hover:border-accent/20 hover:shadow-sm">
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-accent" />
                <p className="text-sm font-medium text-card-foreground md:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Nosso diferencial */}
      <section className="section-padding bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" />
              Diferencial
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Nosso diferencial não está em mostrar mais indicadores.{" "}
              <span className="text-accent">Está em ajudar a empresa a construir leitura melhor.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              A Financeit entende inteligência de negócio como uma disciplina aplicada de clareza, consistência e resposta. É essa visão que nos distancia de abordagens superficiais baseadas apenas em visualização ou volume de informação.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            {diferenciais.map((d) => (
              <div key={d.titulo} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/20 hover:shadow-sm">
                <p className="font-display text-lg font-bold text-foreground">
                  {d.titulo},{" "}
                  <span className="text-accent">{d.destaque}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — Inteligência de negócio como capacidade estratégica */}
      <section className="relative overflow-hidden section-padding bg-navy-gradient text-primary-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-glow">
              <span className="h-px w-6 bg-cyan-glow" />
              Visão estratégica
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Empresas mais maduras não usam informação apenas para olhar o passado.{" "}
              <span className="text-gradient">Usam para responder melhor ao presente e preparar melhor o próximo movimento.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              Quando inteligência de negócio deixa de ser esforço isolado e passa a operar como capacidade estratégica, a empresa ganha mais nitidez para agir, mais consistência para decidir e mais estrutura para evoluir. É nesse ponto que a informação deixa de ser volume e passa a ser vantagem.
            </p>
          </div>
        </div>
      </section>

      {/* 10 — CTA final */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Se a sua empresa precisa transformar informação em direção mais clara,{" "}
              <span className="text-accent">vale aprofundar essa conversa.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              A Financeit conecta dados, contexto, leitura executiva e capacidade de execução para ajudar empresas a amadurecer sua inteligência de negócio de forma prática e consistente.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/solucoes">
                  Conheça nossas soluções <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/contato">Fale com a Financeit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InteligenciaNegocioPage;
