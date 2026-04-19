import { ArrowRight, Layers, Database, ShieldCheck, Network, Eye, Target, AlertTriangle, RefreshCw, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EstruturacaoDadosPage = () => {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-gradient text-primary-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute inset-0">
          <div className="absolute left-[15%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech/[0.06] to-transparent" />
          <div className="absolute left-[55%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech/[0.04] to-transparent" />
          <div className="absolute right-[12%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-tech/[0.04] blur-[120px]" />
        </div>
        <div className="relative section-padding">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              <span className="text-xs font-medium tracking-wide text-accent">Estruturação de Dados para IA</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Antes de escalar IA, sua empresa precisa resolver{" "}
              <span className="text-gradient">a base de dados que sustenta tudo.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
              A Financeit ajuda empresas a eliminar a fragmentação de dados, construir integração consistente e preparar uma base de dados confiável para iniciativas de inteligência artificial.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/50 md:text-base">
              A maioria das empresas que falham com IA não falham pela tecnologia. Falham porque não têm dados organizados, governados, integrados e confiáveis o suficiente para sustentar modelos que gerem valor real.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/contato">Fale com um especialista <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#2198B6' }} asChild>
                <Link to="/avalie-prontidao-ia">Avalie sua prontidão para IA</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fragmentação de dados */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" /> O problema real
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
              Fragmentação de dados é o obstáculo mais comum{" "}
              <span className="text-accent">— e mais subestimado — para IA.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Empresas acumulam anos de sistemas, ERPs, CRMs, planilhas e bases departamentais que raramente conversam entre si. Sem integração, os dados perdem contexto, confiabilidade e capacidade de alimentar decisões ou modelos inteligentes.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
            {[
              { icon: Layers, title: "Silos de dados entre áreas", desc: "Cada departamento tem suas bases, seus formatos e suas definições — sem padrão e sem conexão." },
              { icon: AlertTriangle, title: "Baixa confiabilidade da informação", desc: "Dados duplicados, incompletos, desatualizados ou conflitantes geram dúvida em vez de direção." },
              { icon: RefreshCw, title: "Integração frágil entre sistemas", desc: "Pipelines manuais, extrações pontuais e conciliações que consomem tempo e geram erro." },
              { icon: Lock, title: "Ausência de governança estruturada", desc: "Sem ownership, sem políticas claras de uso e sem rastreabilidade sobre de onde vem cada dado." },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-card p-7 transition-all hover:border-accent/20 hover:shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <b.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que precisa ser estruturado */}
      <section className="section-padding bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
              Estruturar a base de dados para IA envolve resolver problemas que vão{" "}
              <span className="text-accent">muito além de tecnologia.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              A preparação de dados para inteligência artificial exige clareza sobre onde os dados estão, como são acessados, quem é responsável por cada domínio e qual o nível de qualidade necessário para cada caso de uso.
            </p>
          </div>
          <div className="mx-auto mt-14 max-w-3xl space-y-3">
            {[
              "Mapear fontes e domínios de dados da organização",
              "Eliminar redundâncias e conflitos entre bases",
              "Definir padrões de qualidade e consistência",
              "Estabelecer governança com ownership e políticas claras",
              "Integrar fontes sem multiplicar complexidade",
              "Preparar a arquitetura para consumo por modelos de IA",
            ].map((item, i) => (
              <div key={item} className="flex items-center gap-4 rounded-lg border border-border bg-card px-6 py-4 transition-all hover:border-accent/20 hover:shadow-sm">
                <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${i === 0 ? 'bg-orange-accent/10' : 'bg-accent/10'} text-xs font-bold ${i === 0 ? 'text-orange-accent' : 'text-accent'}`}>{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm font-medium text-card-foreground md:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qlik + Denodo */}
      <section className="relative overflow-hidden bg-navy-gradient text-primary-foreground section-padding">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-glow">
              <span className="h-px w-6 bg-cyan-glow" /> Plataformas parceiras
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
              Qlik e Denodo como plataformas para viabilizar{" "}
              <span className="text-gradient">a estruturação de dados pronta para IA.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              A Financeit trabalha com plataformas líderes de mercado para ajudar empresas a construir uma base de dados integrada, governada e pronta para alimentar iniciativas de inteligência artificial com consistência.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15">
                <Database className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold">Qlik</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                Plataforma de integração de dados e analytics que permite conectar, transformar e explorar informações de múltiplas fontes com governança embarcada. Qlik oferece analytics associativo — permitindo descobrir padrões e relações que análises lineares não revelam.
              </p>
              <Button variant="outline" size="sm" className="mt-5 border-accent/30 text-accent hover:bg-accent/10" asChild>
                <Link to="/qlik">Saiba mais sobre Qlik <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
              </Button>
            </div>
            <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15">
                <Network className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold">Denodo</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                Plataforma de virtualização de dados que cria uma camada lógica unificada sobre fontes heterogêneas — sem replicação, sem ETL pesado, com acesso em tempo real e governança centralizada. Ideal para empresas que precisam de integração sem multiplicar complexidade.
              </p>
              <Button variant="outline" size="sm" className="mt-5 border-accent/30 text-accent hover:bg-accent/10" asChild>
                <Link to="/denodo">Saiba mais sobre Denodo <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Como a Financeit ajuda */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" /> Abordagem Financeit
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
              A Financeit atua como parceira para desenhar a base de dados{" "}
              <span className="text-accent">que sua empresa precisa para evoluir com IA.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Nossa abordagem é consultiva e orientada ao contexto do negócio. Antes de implementar tecnologia, ajudamos a entender o estágio atual, mapear gaps, definir prioridades e desenhar uma jornada de estruturação que faça sentido para a realidade de cada empresa.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Eye, label: "Diagnóstico" },
              { icon: Target, label: "Priorização" },
              { icon: Database, label: "Estruturação" },
              { icon: Zap, label: "Evolução" },
            ].map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-accent/20 hover:shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <p.icon className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm font-semibold text-card-foreground">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy-gradient">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-tech/[0.04] blur-[100px]" />
        <div className="container relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
              Se sua empresa quer operar com IA de verdade,{" "}
              <span className="text-gradient">comece pela base.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
              A Financeit ajuda a transformar dados fragmentados em uma base integrada, governada e pronta para alimentar iniciativas de inteligência artificial com consistência e resultado.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/contato">Fale com um especialista <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#2198B6' }} asChild>
                <Link to="/avalie-prontidao-ia">Avalie sua prontidão para IA</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EstruturacaoDadosPage;
