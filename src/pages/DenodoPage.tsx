import { ArrowRight, Layers, Eye, Network, Database, ShieldCheck, Zap, GitMerge, RefreshCw, Target, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DenodoFAQ from "@/components/sections/denodo/DenodoFAQ";

const denodoRed = "#E03127";
const denodoDark = "#2D2D2D";
const denodoRedLight = "#F04E45";

const DenodoPage = () => {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden text-white" style={{ background: `linear-gradient(135deg, ${denodoDark} 0%, #1a1a1a 100%)` }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute inset-0">
          <div className="absolute left-[20%] top-0 h-full w-px" style={{ background: `linear-gradient(to bottom, transparent, ${denodoRed}12, transparent)` }} />
          <div className="absolute left-[60%] top-0 h-full w-px" style={{ background: `linear-gradient(to bottom, transparent, ${denodoRed}08, transparent)` }} />
          <div className="absolute right-[10%] top-[25%] h-[350px] w-[350px] rounded-full blur-[120px]" style={{ backgroundColor: `${denodoRed}10` }} />
          <div className="absolute left-[8%] bottom-[15%] h-[200px] w-[200px] rounded-full blur-[80px]" style={{ backgroundColor: `${denodoRedLight}12` }} />
        </div>
        <div className="relative section-padding">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full px-4 py-1.5" style={{ border: `1px solid ${denodoRed}50`, backgroundColor: `${denodoRed}18` }}>
              <span className="text-xs font-medium tracking-wide" style={{ color: denodoRedLight }}>Virtualização de Dados com Denodo</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Integrar dados não precisa significar{" "}
              <span style={{ color: denodoRed }}>mover, copiar ou replicar tudo.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Com Denodo, a Financeit ajuda empresas a criar uma camada unificada de dados — acessando informações de múltiplas fontes em tempo real, sem duplicação, sem silos e com governança.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
              A virtualização de dados permite que sua empresa trate fontes dispersas como se fossem uma base integrada, com mais agilidade, menos risco e menos complexidade de infraestrutura.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: denodoRed }} asChild>
                <Link to="/contato">Fale com um especialista <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: denodoRed }} asChild>
                <Link to="/estruturacao-dados">Entenda a estruturação de dados</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
              O desafio não é apenas ter acesso aos dados.{" "}
              <span style={{ color: denodoRed }}>É conseguir confiar neles sem multiplicar complexidade.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Muitas empresas replicam dados entre sistemas, criam cópias em data warehouses separados e mantêm pipelines custosos apenas para consolidar informações. Isso gera latência, inconsistência e custos crescentes de manutenção.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[
              { icon: GitMerge, text: "Dados replicados entre múltiplos repositórios sem consistência" },
              { icon: RefreshCw, text: "Pipelines de ETL pesados, lentos e custosos de manter" },
              { icon: Lock, text: "Governança difícil de aplicar com dados dispersos" },
              { icon: Layers, text: "Silos que impedem visão unificada do negócio" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${denodoRed}15` }}>
                  <b.icon className="h-5 w-5" style={{ color: denodoRed }} />
                </div>
                <p className="text-sm font-medium text-card-foreground md:text-base">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que a Denodo oferece */}
      <section className="section-padding bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: denodoRed }}>
              <span className="h-px w-6" style={{ backgroundColor: denodoRed }} />
              Plataforma Denodo
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
              Virtualização de dados:{" "}
              <span style={{ color: denodoRed }}>acesso unificado sem replicação.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Denodo cria uma camada lógica que conecta fontes heterogêneas — bancos de dados, APIs, data lakes, arquivos, ERPs e SaaS — permitindo que a empresa consuma dados integrados em tempo real, com governança e sem mover nada.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Network, title: "Camada lógica unificada", desc: "Acesse todas as fontes de dados como se fossem uma só, sem replicação e sem ETL pesado." },
              { icon: Zap, title: "Acesso em tempo real", desc: "Consulte dados atualizados de múltiplas fontes sem esperar cargas batch ou pipelines de sincronização." },
              { icon: ShieldCheck, title: "Governança centralizada", desc: "Controle de acesso, linhagem e políticas de segurança aplicados de forma consistente em toda a malha de dados." },
              { icon: Database, title: "Data Fabric e Data Mesh", desc: "Suporte a arquiteturas modernas de dados com autonomia para domínios e governança federada." },
              { icon: Target, title: "Self-service para negócio", desc: "Times de negócio acessam dados com autonomia, sem depender de tickets para engenharia de dados." },
              { icon: Eye, title: "Catálogo de dados", desc: "Visibilidade sobre quais dados existem, onde estão, quem os consome e com que qualidade." },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-card p-7 transition-all hover:shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg" style={{ backgroundColor: `${denodoRed}15` }}>
                  <b.icon className="h-5 w-5" style={{ color: denodoRed }} />
                </div>
                <h3 className="font-display text-lg font-bold text-card-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Papel da Financeit */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: denodoRed }}>
                <span className="h-px w-6" style={{ backgroundColor: denodoRed }} />
                O papel da Financeit
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
                Virtualização de dados exige mais do que plataforma.{" "}
                <span style={{ color: denodoRed }}>Exige estratégia de dados.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                A Financeit atua como parceira na adoção de Denodo, ajudando a traduzir necessidade de negócio em arquitetura de dados. Desde o mapeamento de fontes até a construção da camada lógica, nosso foco é gerar valor prático e governança real.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Mapeamento e diagnóstico de fontes de dados",
                "Desenho da arquitetura de virtualização",
                "Implementação da camada lógica unificada",
                "Integração com plataformas de analytics e BI",
                "Evolução contínua da malha de dados",
              ].map((item, i) => (
                <div key={item} className="flex items-center gap-4 rounded-lg border border-border bg-card px-6 py-4 transition-all hover:shadow-sm">
                  <span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: i === 0 ? denodoRed : denodoDark }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-medium text-card-foreground md:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <DenodoFAQ />

      {/* CTA */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${denodoDark} 0%, #1a1a1a 100%)` }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" style={{ backgroundColor: `${denodoRed}08` }} />
        <div className="container relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              Se sua empresa precisa de uma visão unificada dos dados sem multiplicar complexidade,{" "}
              <span style={{ color: denodoRed }}>vale aprofundar essa conversa.</span>
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: denodoRed }} asChild>
                <Link to="/contato">Fale com um especialista <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: denodoRed }} asChild>
                <Link to="/solucoes">Conheça nossas soluções</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DenodoPage;