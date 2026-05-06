import { Users, BarChart3, Target, Network, Receipt, PieChart } from "lucide-react";

const solutionCategories = [
  {
    title: "Serviços",
    items: [
      {
        icon: Target,
        title: "Hunting de Profissionais de TI",
        description: "Hunting, recrutamento e seleção técnica para empresas que precisam de precisão e velocidade na contratação.",
      },
      {
        icon: Users,
        title: "Alocação de Profissionais de TI",
        description: "Squads e profissionais alocados para transformar prioridades de negócio em execução real e escalável.",
      },
    ],
  },
  {
    title: "Produtos",
    items: [
      {
        icon: BarChart3,
        title: "Qlik",
        description: "Líder em integração e visualização de dados para decisões baseadas em fatos.",
      },
      {
        icon: Network,
        title: "Denodo",
        description: "Virtualização de dados para acesso rápido e unificado a fontes heterogêneas.",
      },
      {
        icon: Receipt,
        title: "Avalara",
        description: "Soluções globais para automação fiscal e conformidade tributária.",
      },
      {
        icon: PieChart,
        title: "PPOV",
        description: "Plataforma de gestão estratégica de orçamentos e resultados corporativos.",
      },
    ],
  },
];

const OfertaVisaoGeral = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Uma oferta estruturada para{" "}
            <span className="text-accent">cada necessidade</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed">
            A Financeit divide suas soluções em duas verticais principais para garantir que sua empresa tenha os talentos certos e as melhores ferramentas tecnológicas.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {solutionCategories.map((category) => (
            <div key={category.title}>
              <h3 className="mb-8 font-display text-xl font-bold md:text-2xl border-l-4 border-accent pl-4">
                {category.title}
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {category.items.map((item) => (
                  <div
                    key={item.title}
                    className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:shadow-lg flex items-start gap-6"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <item.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold">{item.title}</h4>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfertaVisaoGeral;