import { Users, BarChart3, ArrowRight, Target, Network, Receipt, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const solutionCategories = [
  {
    title: "Serviços",
    items: [
      {
        icon: Target,
        title: "Hunting de Profissionais de TI",
        description: "Encontre os melhores talentos em TI com precisão técnica e cultural.",
        path: "/hunting-info",
      },
      {
        icon: Users,
        title: "Alocação de Profissionais de TI",
        description: "Aumente sua capacidade de entrega com profissionais qualificados e prontos para atuar.",
        path: "/alocacao-info",
      },
    ],
  },
  {
    title: "Produtos",
    items: [
      {
        icon: BarChart3,
        title: "Qlik",
        description: "Pipeline de dados end-to-end e visualizações poderosas para decisões ágeis.",
        path: "/qlik",
      },
      {
        icon: Network,
        title: "Denodo",
        description: "Virtualização de dados para acesso unificado e sem complexidade.",
        path: "/denodo",
      },
      {
        icon: Receipt,
        title: "Avalara",
        description: "Automação fiscal completa para conformidade e eficiência.",
        path: "/avalara",
      },
      {
        icon: PieChart,
        title: "PPOV",
        description: "Gestão inteligente de orçamentos e resultados corporativos.",
        path: "/ppov",
      },
    ],
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
