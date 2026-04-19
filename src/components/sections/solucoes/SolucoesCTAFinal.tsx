import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SolucoesCTAFinal = () => {
  return (
    <section className="relative overflow-hidden bg-navy-gradient py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-tech/[0.04] blur-[120px]" />
      <div className="absolute right-[15%] top-[30%] h-[150px] w-[150px] rounded-full bg-orange-accent/[0.03] blur-[80px]" />

      <div className="container relative z-10 text-center">
        <h2 className="mx-auto max-w-3xl font-display text-2xl font-bold tracking-tight text-primary-foreground md:text-3xl lg:text-4xl">
          Escolha a frente certa para o desafio que sua empresa precisa{" "}
          <span className="text-gradient">resolver agora.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-primary-foreground/70 md:text-lg leading-relaxed">
          Seja para contratar melhor, estruturar execução, evoluir com IA ou fortalecer áreas críticas da operação, a Financeit ajuda sua empresa a transformar intenção em capacidade real de entrega.
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
            <Link to="/contato">
              Fale com um especialista
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolucoesCTAFinal;
