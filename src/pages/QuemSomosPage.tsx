import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Lightbulb, Network, Eye, ShieldCheck, Layers, TrendingUp, Target, Zap, Award, BookOpen, Compass, Gem, HandshakeIcon } from "lucide-react";

const microprovas = [
  { icon: Eye, text: "Visão construída ao longo de transformações reais" },
  { icon: Target, text: "Inteligência de negócio com aplicação prática" },
  { icon: Network, text: "Conexão entre estratégia e execução" },
  { icon: TrendingUp, text: "Maturidade para evoluir com tecnologia e IA" },
];

const pontosQuemE = [
  "Inteligência de negócio como eixo central",
  "Atuação conectada entre diferentes frentes",
  "Visão prática sobre transformação",
  "Foco em consistência, clareza e resultado",
];

const blocosPensar = [
  { titulo: "Menos abstração", destaque: "mais aderência" },
  { titulo: "Menos solução isolada", destaque: "mais arquitetura de capacidades" },
  { titulo: "Menos hype", destaque: "mais consistência" },
  { titulo: "Menos fricção", destaque: "entre decisão e entrega" },
];

const blocosTrajetoriaHoje = [
  { icon: Compass, titulo: "Leitura mais madura de contexto" },
  { icon: Layers, titulo: "Capacidade de conectar legado e futuro" },
  { icon: Lightbulb, titulo: "Visão prática sobre mudança" },
  { icon: ShieldCheck, titulo: "Apoio estruturado para evolução real" },
];

const diferenciais = [
  "Visão integrada de negócio, tecnologia e operação",
  "Profundidade construída em transformação real",
  "Soluções com aderência ao contexto",
  "Maturidade para evoluir com IA sem superficialidade",
  "Compromisso com clareza, consistência e entrega",
];

const valorizam = [
  "Direção clara em meio à complexidade",
  "Soluções conectadas ao contexto real",
  "Maturidade para evoluir sem improviso",
  "Tecnologia aplicada com critério",
  "Inteligência de negócio com capacidade de execução",
  "Parceiros que entendem transformação além do discurso",
];

const blocosConfianca = [
  { icon: BookOpen, titulo: "Repertório" },
  { icon: Gem, titulo: "Clareza" },
  { icon: Award, titulo: "Consistência" },
  { icon: Zap, titulo: "Capacidade de entrega" },
];

const QuemSomosPage = () => {
  return (
    <div className="bg-background">
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-navy-gradient text-primary-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="relative section-padding">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-glow">
                <span className="h-px w-6 bg-cyan-glow" />
                Quem Somos
              </span>

              <h1 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl xl:text-[3.25rem] xl:leading-[1.15]">
                A Financeit nasce da experiência de quem aprendeu a atravessar transformações reais{" "}
                <span className="text-gradient">sem perder clareza sobre o que gera valor.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-primary-foreground/90 md:text-xl">
                Somos uma empresa de inteligência de negócio que conecta talentos, tecnologia, dados, governança, execução e IA para ajudar organizações a evoluir com mais consistência, direção e capacidade real de entrega.
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/70 md:text-base">
                Nossa trajetória foi construída acompanhando mudanças profundas no modo como empresas operam, decidem e crescem. É essa perspectiva que nos permite atuar com maturidade em um ambiente onde transformação deixou de ser exceção e passou a ser condição permanente.
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

      {/* 2. Quem é a Financeit */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" />
              Identidade
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Mais do que acompanhar mudanças, a Financeit foi construída para ajudar empresas a{" "}
              <span className="text-accent">responder melhor a elas.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              A Financeit atua na interseção entre negócio, tecnologia, talentos, dados e execução. Nossa proposta é ajudar empresas a transformar complexidade em direção mais clara, capacidade operacional mais consistente e evolução mais aderente à realidade do negócio.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
            {pontosQuemE.map((p) => (
              <div key={p} className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-sm font-medium text-card-foreground">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Nossa forma de pensar */}
      <section className="section-padding bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" />
              Forma de pensar
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Acreditamos que evolução sustentável não acontece por discurso.{" "}
              <span className="text-accent">Acontece quando visão e execução passam a operar juntas.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Por isso, nossa atuação não se limita a recomendar caminhos. Nós estruturamos condições para que empresas contratem melhor, organizem operações, avancem com mais clareza em dados e governança, evoluam com IA de forma madura e fortaleçam áreas críticas com soluções aderentes ao contexto real.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            {blocosPensar.map((b) => (
              <div key={b.titulo} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/20 hover:shadow-sm">
                <p className="font-display text-lg font-bold text-foreground">
                  {b.titulo},{" "}
                  <span className="text-accent">{b.destaque}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trajetória — fundador */}
      <section className="relative overflow-hidden section-padding bg-navy-gradient text-primary-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-glow">
              <span className="h-px w-6 bg-cyan-glow" />
              Trajetória
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              A origem da Financeit está ligada a uma trajetória que atravessou{" "}
              <span className="text-gradient">décadas de transformação tecnológica e empresarial.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              Lucio Matos, fundador da Financeit, atua há mais de 40 anos na área de tecnologia da informação. Ao longo dessa trajetória, acompanhou e vivenciou mudanças profundas na forma como empresas registram, organizam, processam e utilizam informação para operar e decidir.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70 md:text-base">
              Da gestão baseada em papel à digitalização, da informatização à integração de sistemas, da consolidação de dados à inteligência de negócio, e agora à inteligência artificial, essa experiência ajuda a sustentar uma visão menos superficial sobre transformação. Uma visão formada na prática, ao longo do tempo, diante de mudanças reais.
            </p>
          </div>
        </div>
      </section>

      {/* 5. O que essa trajetória nos permite */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" />
              Aplicação
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Essa experiência não serve para olhar para trás.{" "}
              <span className="text-accent">Serve para ajudar empresas a responder melhor ao que vem pela frente.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              A Financeit aplica essa bagagem na construção de soluções, estruturas e frentes de atuação que ajudam empresas a lidar com desafios atuais de contratação, execução, dados, governança, IA, compliance fiscal, orçamento e resultado com mais clareza e capacidade de adaptação.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {blocosTrajetoriaHoje.map((b) => (
              <div key={b.titulo} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-accent/20 hover:shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <b.icon className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm font-semibold text-card-foreground">{b.titulo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. O que nos diferencia */}
      <section className="section-padding bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" />
              Diferenciais
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Nosso diferencial não está apenas no que entregamos, mas na forma como conectamos{" "}
              <span className="text-accent">experiência, leitura de negócio e capacidade de execução.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              A Financeit foi estruturada para atuar onde muitas empresas ainda enfrentam desconexão: entre estratégia e operação, entre necessidade e solução, entre tecnologia e aplicação real. É essa capacidade de conexão que fortalece nossa atuação.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-2xl space-y-3">
            {diferenciais.map((d, i) => (
              <div key={d} className="flex items-center gap-4 rounded-lg border border-border bg-card px-6 py-4 transition-all hover:border-accent/20 hover:shadow-sm">
                <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${i === 0 ? 'bg-orange-accent/10' : 'bg-accent/10'} text-xs font-bold ${i === 0 ? 'text-orange-accent' : 'text-accent'}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-medium text-card-foreground md:text-base">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Para empresas que valorizam */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              A Financeit faz sentido para empresas que{" "}
              <span className="text-accent">valorizam:</span>
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-2">
            {valorizam.map((v) => (
              <div key={v} className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4 transition-all hover:border-accent/20 hover:shadow-sm">
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-accent" />
                <p className="text-sm font-medium text-card-foreground md:text-base">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Confiança construída com substância */}
      <section className="section-padding bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" />
              Confiança
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Confiança institucional não se constrói apenas com posicionamento.{" "}
              <span className="text-accent">Se constrói com coerência.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              É a coerência entre visão, repertório, estrutura e capacidade de entrega que sustenta a forma como a Financeit se apresenta ao mercado. Nossa proposta não é parecer preparada para o futuro. É ajudar empresas a construir, na prática, condições mais sólidas para chegar até ele.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {blocosConfianca.map((b) => (
              <div key={b.titulo} className={`flex flex-col items-center gap-3 rounded-xl border ${b.titulo === 'Consistência' ? 'border-orange-accent/15' : 'border-border'} bg-card p-6 text-center transition-all hover:border-accent/20 hover:shadow-sm`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${b.titulo === 'Consistência' ? 'bg-orange-accent/10' : 'bg-accent/10'}`}>
                  <b.icon className={`h-6 w-6 ${b.titulo === 'Consistência' ? 'text-orange-accent' : 'text-accent'}`} />
                </div>
                <p className="text-sm font-bold text-card-foreground">{b.titulo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA final */}
      <section className="section-padding bg-navy-gradient text-primary-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Se a sua empresa precisa evoluir com mais clareza, maturidade e capacidade de execução,{" "}
              <span className="text-gradient">vale conhecer melhor a forma como a Financeit pensa e atua.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              A Financeit conecta experiência, inteligência de negócio e estrutura de entrega para apoiar empresas que não querem apenas acompanhar mudanças, mas responder melhor a elas.
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

export default QuemSomosPage;
