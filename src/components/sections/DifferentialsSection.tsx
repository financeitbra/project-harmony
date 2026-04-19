import { Check } from "lucide-react";

const differentials = [
  "Integração entre talentos, tecnologia, dados e operação",
  "IA com base sólida, não com hype",
  "Governança como requisito para escala",
  "Soluções conectadas ao negócio real",
  "Estrutura para sair do piloto e entrar em produção",
  "Atuação multissetorial com visão aplicada",
];

const DifferentialsSection = () => {
  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
      <div className="container relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            Não entregamos peças soltas.{" "}
            <span className="text-gradient">Estruturamos capacidade de negócio.</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
          {differentials.map((item, i) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-lg border border-primary-foreground/10 bg-primary-foreground/[0.03] p-5 backdrop-blur-sm"
            >
              <Check className={`mt-0.5 h-5 w-5 shrink-0 ${i === 1 ? 'text-orange-accent' : 'text-accent'}`} />
              <span className="text-sm font-medium leading-relaxed text-primary-foreground/80">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
