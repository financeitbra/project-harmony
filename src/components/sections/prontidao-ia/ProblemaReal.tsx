import { AlertTriangle } from "lucide-react";

const problemas = [
  "Pilotos desconectados do negócio",
  "Dados insuficientes ou inconsistentes",
  "Ausência de governança",
  "Baixa capacidade de integração",
  "Dificuldade de sair da experimentação",
];

const ProblemaReal = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            O problema real
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            O problema não é começar com IA cedo demais.{" "}
            <span className="text-gradient">É começar sem estrutura.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed max-w-2xl mx-auto">
            Muitas empresas entram em iniciativas de IA pela pressão do mercado, pela promessa de eficiência ou pelo desejo de inovação rápida. Mas quando dados, governança, arquitetura, casos de uso e operação não estão preparados, a iniciativa perde consistência antes de gerar valor real.
          </p>
        </div>

        <div className="mt-14 mx-auto max-w-2xl">
          <div className="space-y-4">
            {problemas.map((problema, i) => (
              <div
                key={i}
                className="group relative flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-md"
              >
                {i === 0 && (
                  <div className="absolute left-0 top-4 h-6 w-0.5 rounded-full bg-orange-accent opacity-60" />
                )}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </div>
                <p className="text-sm font-medium text-foreground md:text-base">{problema}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemaReal;
