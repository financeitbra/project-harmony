import { Users, Code2, BarChart3, Brain, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: Users,
    title: "Talentos estratégicos",
    description: "Hunting, recrutamento e alocação para empresas que precisam ampliar capacidade com mais precisão e velocidade.",
  },
  {
    icon: Code2,
    title: "Execução escalável",
    description: "Squads, software e estrutura de entrega para transformar prioridade de negócio em resultado concreto.",
  },
  {
    icon: BarChart3,
    title: "Tecnologia aplicada",
    description: "Soluções de software e plataforma alinhadas à realidade do negócio, com foco em clareza e eficiência operacional.",
  },
  {
    icon: Brain,
    title: "Dados, governança e IA",
    description: "Governança, prontidão para IA e estrutura para produtos e operações orientados por inteligência.",
  },
  {
    icon: Building2,
    title: "Soluções empresariais especializadas",
    description: "Capacidades aplicadas a áreas críticas como fiscal, orçamento e resultado com parceiros estratégicos.",
  },
];

const SolutionsSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            A estrutura que sua empresa precisa para executar melhor hoje e{" "}
            <span className="text-accent">evoluir com inteligência amanhã.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((sol, i) => (
            <div
              key={sol.title}
              className="group relative rounded-lg border border-border bg-card p-7 transition-all hover:border-accent/40 hover:shadow-lg"
            >
              {i === 0 && (
                <div className="absolute left-0 top-6 h-8 w-0.5 rounded-full bg-orange-accent/60" />
              )}
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-accent/10 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <sol.icon className="h-5 w-5 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold">{sol.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {sol.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/solucoes">
              Explore nossas soluções
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
