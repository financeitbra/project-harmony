import { ArrowRight, Layers, Eye, Network, Database, ShieldCheck, Zap, BarChart3, RefreshCw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import QlikFAQ from "@/components/sections/qlik/QlikFAQ";

const qlikGreen = "#009845";
const qlikNavy = "#1A2456";
const qlikTeal = "#4DC9C1";

const QlikPage = () => {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden text-white" style={{ background: `linear-gradient(135deg, ${qlikNavy} 0%, #0b1530 100%)` }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute inset-0">
          <div className="absolute left-[15%] top-0 h-full w-px" style={{ background: `linear-gradient(to bottom, transparent, ${qlikTeal}15, transparent)` }} />
          <div className="absolute left-[55%] top-0 h-full w-px" style={{ background: `linear-gradient(to bottom, transparent, ${qlikTeal}10, transparent)` }} />
          <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full blur-[120px]" style={{ backgroundColor: `${qlikGreen}12` }} />
          <div className="absolute left-[5%] bottom-[10%] h-[250px] w-[250px] rounded-full blur-[80px]" style={{ backgroundColor: `${qlikTeal}18` }} />
        </div>
        <div className="relative section-padding">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full px-4 py-1.5" style={{ border: `1px solid ${qlikGreen}50`, backgroundColor: `${qlikGreen}18` }}>
              <span className="text-xs font-medium tracking-wide" style={{ color: qlikTeal }}>Analytics e Integração de Dados com Qlik</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Dados dispersos não geram inteligência.{" "}
              <span style={{ color: qlikGreen }}>Dados conectados, sim.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Com Qlik, a Financeit ajuda empresas a integrar, visualizar e explorar dados de forma ativa — transformando informação fragmentada em leitura clara, confiável e orientada a decisão.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
              A plataforma Qlik oferece capacidades avançadas de integração de dados, analytics associativo e inteligência de negócio que permitem às empresas ir além de dashboards estáticos e construir uma cultura analítica mais madura e consistente.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: qlikGreen }} asChild>
                <Link to="/contato">Fale com um especialista <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: qlikGreen }} asChild>
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
              Muitas empresas têm dados, mas não têm{" "}
              <span style={{ color: qlikGreen }}>respostas confiáveis.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Quando os dados estão espalhados em sistemas distintos, sem integração, sem governança e sem contexto, a empresa acumula informação — mas não consegue transformar essa informação em leitura executiva confiável.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[
              { icon: Layers, text: "Dados fragmentados entre ERPs, CRMs e sistemas legados" },
              { icon: Eye, text: "Relatórios que mostram números, mas não geram direção" },
              { icon: RefreshCw, text: "Retrabalho constante para consolidar visões diferentes" },
              { icon: BarChart3, text: "Análises que dependem de esforço manual excessivo" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-sm" style={{ ['--hover-border' as string]: qlikGreen }}>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${qlikGreen}15` }}>
                  <b.icon className="h-5 w-5" style={{ color: qlikGreen }} />
                </div>
                <p className="text-sm font-medium text-card-foreground md:text-base">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que a Qlik oferece */}
      <section className="section-padding bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: qlikGreen }}>
              <span className="h-px w-6" style={{ backgroundColor: qlikGreen }} />
              Plataforma Qlik
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
              Qlik é mais do que visualização.{" "}
              <span style={{ color: qlikGreen }}>É inteligência ativa sobre os dados.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              A plataforma Qlik combina integração de dados, analytics associativo e inteligência artificial para permitir que empresas explorem informações de forma mais livre, rápida e confiável — sem depender de caminhos pré-definidos.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Database, title: "Integração de dados", desc: "Conexão e movimentação de dados entre múltiplas fontes com qualidade, rastreabilidade e governança." },
              { icon: Network, title: "Analytics associativo", desc: "Exploração livre dos dados, sem caminhos predefinidos, revelando relações e padrões que análises lineares não mostram." },
              { icon: Eye, title: "Visualização inteligente", desc: "Painéis interativos que transformam dados em leitura executiva clara, contextualizada e orientada à decisão." },
              { icon: Zap, title: "IA e automação", desc: "Insights assistidos por inteligência artificial, sugestões automáticas e alertas proativos para acelerar a análise." },
              { icon: ShieldCheck, title: "Governança embarcada", desc: "Controle de acesso, linhagem de dados e políticas de segurança integradas à plataforma." },
              { icon: Target, title: "Escalabilidade", desc: "Capacidade para crescer com a operação, da análise departamental à inteligência corporativa." },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-card p-7 transition-all hover:shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg" style={{ backgroundColor: `${qlikGreen}15` }}>
                  <b.icon className="h-5 w-5" style={{ color: qlikGreen }} />
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
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: qlikGreen }}>
                <span className="h-px w-6" style={{ backgroundColor: qlikGreen }} />
                O papel da Financeit
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
                A tecnologia certa precisa da estrutura certa{" "}
                <span style={{ color: qlikGreen }}>para gerar resultado.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                A Financeit atua como parceira na adoção de Qlik, conectando a capacidade da plataforma à realidade operacional de cada empresa. Mais do que implementar, ajudamos a estruturar a jornada: desde o diagnóstico de dados até a construção de uma cultura analítica consistente.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Diagnóstico e mapeamento de fontes de dados",
                "Estratégia de integração e governança",
                "Implementação e configuração da plataforma",
                "Treinamento e capacitação de equipes",
                "Evolução contínua e suporte especializado",
              ].map((item, i) => (
                <div key={item} className="flex items-center gap-4 rounded-lg border border-border bg-card px-6 py-4 transition-all hover:shadow-sm">
                  <span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: i === 0 ? qlikGreen : qlikTeal }}
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


      <QlikFAQ />

      {/* CTA */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${qlikNavy} 0%, #0b1530 100%)` }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" style={{ backgroundColor: `${qlikGreen}08` }} />
        <div className="container relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              Se sua empresa precisa transformar dados dispersos em inteligência conectada,{" "}
              <span style={{ color: qlikGreen }}>a conversa pode começar agora.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              A Financeit conecta Qlik à realidade da sua operação para construir uma base analítica mais madura, confiável e orientada a resultado.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: qlikGreen }} asChild>
                <Link to="/contato">Fale com um especialista <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: qlikGreen }} asChild>
                <Link to="/solucoes">Conheça nossas soluções</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QlikPage;