import { ChevronRight } from "lucide-react";

const necessidades = [
  "Avaliar seu estágio real de prontidão para IA",
  "Organizar dados e governança antes de escalar iniciativas",
  "Identificar casos de uso com aderência ao negócio",
  "Reduzir risco em projetos de IA",
  "Sair da experimentação fragmentada",
  "Estruturar a base para evoluir com mais consistência",
];

const ParaEmpresasProntidao = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            Para quem é
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            Esta frente faz sentido para{" "}
            <span className="text-gradient">empresas que precisam:</span>
          </h2>
        </div>

        <div className="mt-14 mx-auto max-w-2xl">
          <div className="space-y-3">
            {necessidades.map((item, i) => (
              <div
                key={i}
                className="relative flex items-center gap-3 rounded-lg border border-border bg-card px-6 py-4 transition-all hover:border-accent/20 hover:shadow-sm"
              >
                {i === 0 && (
                  <div className="absolute left-0 top-3 h-6 w-0.5 rounded-full bg-orange-accent opacity-60" />
                )}
                <ChevronRight className="h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm font-medium text-foreground md:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParaEmpresasProntidao;
