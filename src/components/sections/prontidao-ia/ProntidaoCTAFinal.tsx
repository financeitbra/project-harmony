import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProntidaoCTAFinal = () => {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 bg-navy-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-tech/[0.05] blur-[140px]" />
      <div className="absolute right-[20%] bottom-[25%] h-[120px] w-[120px] rounded-full bg-orange-accent/[0.03] blur-[60px]" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <span className="text-xs font-medium tracking-wide text-accent">Comece agora</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            Se sua empresa quer evoluir com IA de forma consistente,{" "}
            <span className="text-gradient">o primeiro passo é estruturar a base certa.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
            A Financeit ajuda sua organização a entender o estágio atual, reduzir lacunas críticas e construir as condições necessárias para transformar IA em capacidade real de negócio.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/prontidao-ia/avaliacao">
                Avaliar maturidade de dados e IA
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              asChild
            >
              <Link to="/contato">
                Solicite uma conversa estratégica
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProntidaoCTAFinal;
