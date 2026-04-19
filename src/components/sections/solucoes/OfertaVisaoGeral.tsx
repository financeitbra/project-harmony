import { Users, Code2, BarChart3, Brain, Building2 } from "lucide-react";

const camadas = [
  {
    icon: Users,
    number: "01",
    title: "Talentos",
    description: "Hunting, recrutamento e alocação para empresas que precisam ampliar capacidade com mais precisão e velocidade.",
  },
  {
    icon: Code2,
    number: "02",
    title: "Execução",
    description: "Squads, software e estrutura de entrega para transformar prioridade de negócio em resultado concreto.",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "Inteligência de negócio",
    description: "Mais clareza para decidir, organizar a operação e direcionar esforços com melhor aderência.",
  },
  {
    icon: Brain,
    number: "04",
    title: "Dados e IA",
    description: "Governança, prontidão para IA e estrutura para produtos e operações orientados por inteligência.",
  },
  {
    icon: Building2,
    number: "05",
    title: "Soluções empresariais especializadas",
    description: "Capacidades aplicadas a áreas críticas, como fiscal, orçamento e resultado.",
  },
];

const OfertaVisaoGeral = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Uma oferta integrada em{" "}
            <span className="text-accent">cinco camadas</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed">
            A Financeit organiza suas soluções para responder a desafios reais de contratação, execução, eficiência operacional, dados, governança e evolução tecnológica.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {camadas.map((c, i) => (
            <div
              key={c.title}
              className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:shadow-lg"
            >
              {/* Layer number */}
              <span className={`absolute right-6 top-6 font-display text-3xl font-extrabold ${i === 0 ? 'text-orange-accent/30' : 'text-muted/60'}`}>
                {c.number}
              </span>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <c.icon className="h-5 w-5 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfertaVisaoGeral;
