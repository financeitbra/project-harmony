import { CheckCircle2 } from "lucide-react";

const diferenciais = [
  "Visão integrada entre negócio, tecnologia e operação",
  "Capacidade de combinar execução imediata com evolução estrutural",
  "IA tratada com maturidade, não como tendência vazia",
  "Soluções aderentes à realidade do cliente",
  "Mais controle para crescer com consistência",
];

const IntegracaoFrente = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: content */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-6 bg-accent" />
              Diferencial
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
              Não tratamos suas demandas como{" "}
              <span className="text-accent">partes isoladas.</span>
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed">
              O diferencial da Financeit está na capacidade de conectar talentos, tecnologia, execução, dados, governança e soluções especializadas em uma lógica única de negócio. Isso reduz atrito, aumenta clareza e melhora a qualidade da execução.
            </p>
          </div>

          {/* Right: list */}
          <div className="space-y-4">
            {diferenciais.map((d, i) => (
              <div
                key={d}
                className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-all hover:border-accent/20"
              >
                <div className="mt-0.5 flex-shrink-0">
                  <CheckCircle2 className={`h-5 w-5 ${i === 2 ? 'text-orange-accent' : 'text-accent'}`} />
                </div>
                <p className="text-sm font-medium leading-relaxed text-card-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegracaoFrente;
