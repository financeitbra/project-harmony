import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SolucoesHero = () => {
  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      {/* Visual depth layers */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
      <div className="absolute inset-0">
        <div className="absolute left-[15%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech/[0.05] to-transparent" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech/[0.04] to-transparent" />
        <div className="absolute left-[80%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech/[0.03] to-transparent" />
        <div className="absolute left-0 top-[40%] h-px w-full bg-gradient-to-r from-transparent via-cyan-tech/[0.05] to-transparent" />
        <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-tech/[0.03] blur-[100px]" />
        <div className="absolute left-[5%] bottom-[10%] h-[250px] w-[250px] rounded-full bg-petrol/15 blur-[80px]" />
      </div>

      <div className="container relative z-10 py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-orange-accent" />
            <span className="text-xs font-medium tracking-wide text-accent">Soluções</span>
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Soluções para empresas que precisam executar melhor hoje e{" "}
            <span className="text-gradient">evoluir com inteligência amanhã.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
            A Financeit conecta talentos, tecnologia, dados, governança e soluções empresariais para ajudar sua empresa a contratar melhor, acelerar entregas, estruturar operações e avançar com mais controle.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/50 md:text-base">
            Nossa atuação combina execução tangível com visão estratégica. Isso significa menos fricção entre decisão e entrega, mais aderência ao negócio e uma base mais sólida para evoluir com tecnologia e IA.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/contato">
                Fale com um especialista
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              asChild
            >
              <Link to="/contato">
                Apresente seu desafio
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default SolucoesHero;
