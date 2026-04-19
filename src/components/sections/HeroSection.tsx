import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const microproofs = [
  "Desde 2011",
  "Atuação multissetorial",
  "Talentos, tecnologia, dados e IA",
  "Parceiros estratégicos",
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      {/* Layered visual depth */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      <div className="absolute inset-0">
        {/* Diagonal structural lines */}
        <div className="absolute left-0 top-0 h-full w-full opacity-[0.04]">
          <div className="absolute left-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech to-transparent" />
          <div className="absolute left-[30%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech to-transparent" />
          <div className="absolute left-[60%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech to-transparent" />
          <div className="absolute left-[85%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech to-transparent" />
        </div>
        {/* Horizontal accent lines */}
        <div className="absolute left-0 top-[25%] h-px w-full bg-gradient-to-r from-transparent via-cyan-tech/[0.06] to-transparent" />
        <div className="absolute left-0 top-[65%] h-px w-full bg-gradient-to-r from-transparent via-cyan-tech/[0.04] to-transparent" />
        {/* Subtle radial glow */}
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-tech/[0.04] blur-[120px]" />
        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-petrol/20 blur-[100px]" />
      </div>

      <div className="container relative z-10 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-orange-accent" />
            <span className="text-xs font-medium tracking-wide text-accent">
              Inteligência de Negócio
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Sua empresa não precisa apenas usar IA.{" "}
            <span className="text-gradient">
              Precisa estar pronta para operar com ela.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
            A Financeit conecta talentos, tecnologia, dados, governança e execução para transformar inteligência artificial em capacidade real de negócio.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/50 md:text-base">
            Ajudamos empresas a contratar melhor, acelerar entregas, estruturar operações e construir a base necessária para produtos de IA consistentes, aderentes ao negócio e sustentáveis em escala.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/contato">
                Solicite uma conversa estratégica
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              asChild
            >
              <Link to="/avalie-prontidao-ia">
                Avalie sua prontidão para IA
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Microproofs bar */}
      <div className="relative z-10 border-t border-primary-foreground/10 bg-navy/80 backdrop-blur-sm">
        <div className="container py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {microproofs.map((proof, i) => (
              <div key={proof} className="flex items-center gap-2.5 text-xs font-medium text-primary-foreground/50 md:text-sm">
                <span className={`block h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-orange-accent' : 'bg-accent/60'}`} />
                {proof}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
