import { Database, ShieldCheck, Network, Target } from "lucide-react";

const pillars = [
  {
    icon: Database,
    title: "Dados consistentes",
    description: "Sem dados organizados, governados e confiáveis, qualquer iniciativa de IA é especulação.",
  },
  {
    icon: ShieldCheck,
    title: "Governança real",
    description: "Compliance, segurança e processos claros são pré-requisitos para escalar, não opcionais.",
  },
  {
    icon: Network,
    title: "Arquitetura de execução",
    description: "Sistemas preparados para integrar, escalar e evoluir com inteligência artificial de forma sustentável.",
  },
  {
    icon: Target,
    title: "Aderência ao negócio",
    description: "Tecnologia que não se conecta à realidade operacional do negócio não gera valor. Gera custo.",
  },
];

const AIReadinessSection = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            IA sem dados confiáveis, governança e execução{" "}
            <span className="text-accent">não gera vantagem competitiva.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed">
            O mercado fala muito sobre inteligência artificial. Poucos falam sobre o que realmente sustenta valor: dados consistentes, governança, arquitetura, talentos e aderência ao negócio. É nesse ponto que a Financeit atua.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-lg"
            >
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-md transition-colors group-hover:bg-accent group-hover:text-accent-foreground ${pillar.title === 'Aderência ao negócio' ? 'bg-orange-accent/10' : 'bg-accent/10'}`}>
                <pillar.icon className={`h-5 w-5 group-hover:text-accent-foreground ${pillar.title === 'Aderência ao negócio' ? 'text-orange-accent' : 'text-accent'}`} />
              </div>
              <h3 className="font-display text-lg font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIReadinessSection;
