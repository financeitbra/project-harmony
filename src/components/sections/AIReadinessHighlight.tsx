import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const items = [
  "Mapeamento de maturidade",
  "Diagnóstico de dados e governança",
  "Identificação de casos de uso viáveis",
  "Estruturação da esteira de produto",
  "Base operacional para IA com escala",
];

const AIReadinessHighlight = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-br from-card via-card to-accent/[0.03]">
          <div className="grid items-center gap-10 p-8 md:grid-cols-2 md:p-12 lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
                <span className="h-px w-6 bg-accent" />
                Diferenciação
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
                Prontidão para IA
              </h2>
              <p className="mt-2 text-lg font-medium text-accent">
                Dados, governança e estrutura para produtos aderentes ao negócio.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Antes de escalar IA, sua empresa precisa resolver a base: qualidade de dados, governança, clareza de caso de uso, contexto operacional e capacidade de execução. A Financeit ajuda a estruturar esses elementos para transformar potencial em resultado.
              </p>
              <div className="mt-8">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to="/avalie-prontidao-ia">
                    Avalie sua prontidão para IA
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {items.map((item, i) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/50 p-4 transition-colors hover:border-accent/30"
                >
                  <CheckCircle className={`mt-0.5 h-5 w-5 shrink-0 ${i === 0 ? 'text-orange-accent' : 'text-accent'}`} />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIReadinessHighlight;
