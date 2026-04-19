import { ArrowRight } from "lucide-react";

const necessidades = [
  "Contratar com mais assertividade",
  "Acelerar capacidade de entrega",
  "Organizar operações com mais controle",
  "Estruturar dados e governança para evoluir com IA",
  "Reduzir fricção entre estratégia e execução",
  "Ganhar mais visibilidade sobre orçamento, resultado e áreas críticas do negócio",
];

const ParaEmpresasQue = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Esta estrutura faz sentido para{" "}
            <span className="text-accent">empresas que precisam:</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <div className="space-y-3">
            {necessidades.map((n, i) => (
              <div
                key={n}
                className="flex items-center gap-4 rounded-lg border border-border bg-card px-6 py-4 transition-all hover:border-accent/20 hover:shadow-sm"
              >
                <ArrowRight className={`h-4 w-4 flex-shrink-0 ${i === 3 ? 'text-orange-accent' : 'text-accent'}`} />
                <p className="text-sm font-medium text-card-foreground md:text-base">{n}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParaEmpresasQue;
