import { Database, Shield, Target, Cog } from "lucide-react";

const blocos = [
  {
    icon: Database,
    title: "Dados confiáveis",
    description: "Sem qualidade, contexto e consistência de dados, IA produz resposta frágil em escala.",
  },
  {
    icon: Shield,
    title: "Governança clara",
    description: "Sem critérios, ownership, segurança e responsabilidades definidas, a evolução da IA se torna instável.",
  },
  {
    icon: Target,
    title: "Casos de uso viáveis",
    description: "Nem toda oportunidade aparente gera valor real. É preciso priorizar onde a IA de fato aumenta capacidade de negócio.",
  },
  {
    icon: Cog,
    title: "Execução operacional",
    description: "IA só gera impacto quando encontra processos, times e arquitetura capazes de absorver valor na prática.",
  },
];

const OQueEProntidao = () => {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 bg-navy-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute right-[10%] top-[30%] h-[400px] w-[400px] rounded-full bg-cyan-tech/[0.04] blur-[120px]" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            O conceito
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            Prontidão para IA não é maturidade estética.{" "}
            <span className="text-gradient">É capacidade estrutural.</span>
          </h2>
          <p className="mt-5 text-primary-foreground/70 md:text-lg leading-relaxed max-w-2xl mx-auto">
            Uma empresa pronta para IA não é a que apenas usa ferramentas novas. É a que possui condições reais para aplicar inteligência artificial com aderência ao negócio, governança adequada, base de dados consistente e capacidade de execução.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {blocos.map((bloco) => (
            <div
              key={bloco.title}
              className="group rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-primary-foreground/10"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15 transition-colors group-hover:bg-accent">
                <bloco.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-foreground">{bloco.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-primary-foreground/60">{bloco.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OQueEProntidao;
