import { ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-tech/[0.04] blur-[100px]" />
      <div className="absolute right-[15%] top-[30%] h-[150px] w-[150px] rounded-full bg-orange-accent/[0.03] blur-[80px]" />

      <div className="container relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold leading-tight text-primary-foreground md:text-3xl lg:text-4xl">
            Se sua empresa quer operar com mais inteligência, velocidade e controle,{" "}
            <span className="text-gradient">o próximo passo é estruturar a base certa.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/70 md:text-lg leading-relaxed">
            A Financeit ajuda sua organização a transformar talentos, tecnologia, dados e IA em capacidade real de execução.
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
                <MessageSquare className="mr-2 h-4 w-4" />
                Apresente seu desafio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
