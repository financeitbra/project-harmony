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
        color: "#0EA5E9"
      },
      {
        icon: Users,
        title: "Alocação de Profissionais de TI",
        description: "Aumente sua capacidade de entrega com profissionais qualificados e prontos para atuar.",
        path: "/alocacao-info",
        color: "#0EA5E9"
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
        color: "#009845"
      },
      {
        icon: Network,
        title: "Denodo",
        description: "Virtualização de dados para acesso unificado e sem complexidade.",
        path: "/denodo",
        color: "#E03127"
      },
      {
        icon: Receipt,
        title: "Avalara",
        description: "Automação fiscal completa para conformidade e eficiência.",
        path: "/avalara",
        color: "#ff6600"
      },
      {
        icon: PieChart,
        title: "PPOV",
        description: "Gestão inteligente de orçamentos e resultados corporativos.",
        path: "/ppov",
        color: "#00d1b2"
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

        <div className="mt-16 space-y-16">
          {solutionCategories.map((category) => (
            <div key={category.title}>
              <h3 className="mb-8 font-display text-xl font-bold md:text-2xl border-l-4 border-accent pl-4">
                {category.title}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {category.items.map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="group relative rounded-lg border border-border bg-card p-7 transition-all hover:border-accent/40 hover:shadow-lg flex flex-col md:flex-row gap-5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent/10 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <item.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-semibold">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
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
