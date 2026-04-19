import { Eye, Target, Gauge, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const destaques = [
  { icon: Eye, text: "Mais visibilidade sobre prioridades" },
  { icon: Target, text: "Mais aderência entre necessidade e solução" },
  { icon: Gauge, text: "Mais eficiência operacional" },
  { icon: Compass, text: "Mais critério para evoluir com tecnologia" },
];

const InteligenciaNegocio = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            Inteligência de Negócio
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Decisão melhor começa com mais clareza sobre{" "}
            <span className="text-accent">o que realmente move a operação.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed max-w-2xl mx-auto">
            Na Financeit, inteligência de negócio não é apenas análise. É a capacidade de conectar contexto, tecnologia, dados, talentos e execução para gerar decisões mais consistentes e resultados mais sustentáveis.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((d) => (
            <div
              key={d.text}
              className="group flex flex-col items-center rounded-xl border border-border bg-card p-7 text-center transition-all hover:border-accent/30 hover:shadow-lg"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors group-hover:bg-accent group-hover:text-accent-foreground ${d.text === 'Mais critério para evoluir com tecnologia' ? 'bg-orange-accent/10' : 'bg-accent/10'}`}>
                <d.icon className={`h-5 w-5 group-hover:text-accent-foreground ${d.text === 'Mais critério para evoluir com tecnologia' ? 'text-orange-accent' : 'text-accent'}`} />
              </div>
              <p className="text-sm font-medium leading-relaxed text-card-foreground">{d.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/inteligencia-negocios">
              Entenda nossa visão de inteligência de negócio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InteligenciaNegocio;
