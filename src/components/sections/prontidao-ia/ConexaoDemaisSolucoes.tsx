import { Users, Rocket, BarChart3, Code2, ShieldCheck } from "lucide-react";

const conexoes = [
  {
    icon: Users,
    label: "Talentos para sustentar evolução",
  },
  {
    icon: Rocket,
    label: "Execução para transformar direção em entrega",
  },
  {
    icon: BarChart3,
    label: "Inteligência de negócio para priorizar melhor",
  },
  {
    icon: Code2,
    label: "Tecnologia para integrar e operacionalizar",
  },
  {
    icon: ShieldCheck,
    label: "Governança para escalar com consistência",
  },
];

const ConexaoDemaisSolucoes = () => {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 bg-navy-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute left-[20%] top-[20%] h-[350px] w-[350px] rounded-full bg-petrol/15 blur-[100px]" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            Integração
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            Prontidão para IA não é uma frente isolada.{" "}
            <span className="text-gradient">Ela se conecta à estrutura do negócio.</span>
          </h2>
          <p className="mt-5 text-primary-foreground/70 md:text-lg leading-relaxed max-w-2xl mx-auto">
            Na Financeit, a evolução com IA está articulada com talentos, execução, desenvolvimento, inteligência de negócio e soluções empresariais. Isso permite que a preparação para IA não fique restrita ao discurso tecnológico, mas faça parte da capacidade real de operação da empresa.
          </p>
        </div>

        <div className="mt-14 mx-auto max-w-2xl">
          <div className="space-y-4">
            {conexoes.map((conexao, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-6 py-5 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-primary-foreground/10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 transition-colors group-hover:bg-accent">
                  <conexao.icon className="h-5 w-5 text-accent group-hover:text-accent-foreground" />
                </div>
                <p className="text-sm font-medium text-primary-foreground md:text-base">{conexao.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConexaoDemaisSolucoes;
