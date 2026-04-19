import { Receipt, PieChart, BarChart3, Network, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const solucoes = [
  {
    icon: BarChart3,
    title: "Analytics e dados com Qlik",
    description: "Consolidação de dados, capacidade analítica e governança para uma leitura de negócio mais confiável e conectada.",
    link: "/qlik",
    accentClass: "bg-accent/10",
    iconClass: "text-accent",
    hoverClass: "hover:border-accent/30",
  },
  {
    icon: Network,
    title: "Virtualização e integração com Denodo",
    description: "Acesso integrado a dados distribuídos sem replicação, com agilidade, governança e visão unificada.",
    link: "/denodo",
    accentClass: "bg-accent/10",
    iconClass: "text-accent",
    hoverClass: "hover:border-accent/30",
  },
  {
    icon: Receipt,
    title: "Soluções Fiscais com Avalara",
    description: "Mais automação, compliance e segurança para operações fiscais que exigem precisão e escalabilidade.",
    link: "/avalara",
    accentClass: "bg-orange-accent/10",
    iconClass: "text-orange-accent",
    hoverClass: "hover:border-orange-accent/30",
  },
  {
    icon: PieChart,
    title: "Gestão de Orçamento e Resultado com PPOV",
    description: "Mais visibilidade gerencial, planejamento e inteligência para acompanhar desempenho e apoiar decisões com mais consistência.",
    link: "/ppov",
    accentClass: "bg-green-accent/10",
    iconClass: "text-green-accent",
    hoverClass: "hover:border-green-accent/30",
  },
];

const SolucoesEspecializadas = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            Plataformas e Soluções Especializadas
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Tecnologias e soluções aplicadas a{" "}
            <span className="text-accent">áreas críticas do negócio.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed">
            A Financeit atua com plataformas líderes de mercado para dados, analytics, integração, compliance fiscal e gestão orçamentária, sempre conectadas ao contexto real do negócio.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {solucoes.map((s) => (
            <div
              key={s.title}
              className={`group rounded-xl border border-border bg-card p-8 md:p-10 transition-all ${s.hoverClass} hover:shadow-lg`}
            >
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${s.accentClass}`}>
                <s.icon className={`h-6 w-6 ${s.iconClass}`} />
              </div>
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <Link
                to={s.link}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
              >
                Conheça a solução <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/contato">
              Fale com um especialista
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolucoesEspecializadas;
