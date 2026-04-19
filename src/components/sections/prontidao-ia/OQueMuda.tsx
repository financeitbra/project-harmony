import { CheckCircle2 } from "lucide-react";

const beneficios = [
  "Menos pilotos frágeis",
  "Mais aderência ao negócio",
  "Maior capacidade de escala",
  "Decisões mais consistentes",
  "Evolução com mais segurança",
];

const OQueMuda = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            Resultado
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            Quando a base está certa, a IA deixa de ser promessa{" "}
            <span className="text-gradient">e passa a operar como capacidade.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed max-w-2xl mx-auto">
            Com dados mais confiáveis, governança mais clara, prioridades melhor definidas e contexto operacional estruturado, a empresa reduz ruído, aumenta aderência e cria condições reais para que iniciativas com IA gerem eficiência, inteligência e vantagem competitiva sustentável.
          </p>
        </div>

        <div className="mt-14 mx-auto max-w-2xl">
          <div className="rounded-xl border border-border bg-card p-8 md:p-10">
            <div className="space-y-5">
              {beneficios.map((beneficio, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-base font-medium text-foreground md:text-lg">{beneficio}</p>
                  {i === 0 && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-orange-accent opacity-50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OQueMuda;
