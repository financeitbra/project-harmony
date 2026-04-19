import { Layers, Code2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const solucoes = [
  {
    icon: Layers,
    title: "Alocação de Squads",
    description: "Times estruturados para acelerar projetos, reduzir atrito entre planejamento e entrega e ampliar previsibilidade operacional.",
    link: "/solucoes/squads",
  },
  {
    icon: Code2,
    title: "Desenvolvimento de Software",
    description: "Soluções tecnológicas aderentes ao negócio, pensadas para eficiência, integração e evolução contínua da operação.",
    link: "/solucoes/software",
  },
];

const ExecucaoEscalavel = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            Execução
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Mais capacidade de entrega para operações que{" "}
            <span className="text-accent">não podem perder ritmo.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed">
            Quando a demanda exige velocidade, estrutura e consistência, a Financeit apoia a empresa com times, software e capacidade de execução organizados para sustentar evolução.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {solucoes.map((s) => (
            <div
              key={s.title}
              className="group rounded-xl border border-border bg-card p-8 md:p-10 transition-all hover:border-accent/30 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <s.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.description}</p>
              <Link
                to={s.link}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
              >
                Saiba mais <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/solucoes/execucao">
              Explore as soluções de execução
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExecucaoEscalavel;
