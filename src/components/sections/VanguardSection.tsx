import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VanguardSection = () => {
  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
      <div className="absolute left-0 top-[40%] h-px w-full bg-gradient-to-r from-transparent via-orange-accent/[0.04] to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-tech/[0.03] blur-[100px]" />

      <div className="container relative z-10 py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold leading-tight text-primary-foreground md:text-3xl lg:text-4xl">
            A próxima vantagem competitiva não será de quem adota IA primeiro.{" "}
            <span className="text-gradient">Será de quem constrói a base certa antes dos outros.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
            Empresas vencedoras não serão definidas por pilotos isolados ou automações pontuais. Serão definidas pela capacidade de conectar dados confiáveis, governança, arquitetura, talentos e operação em uma esteira real de inteligência aplicada.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/50">
            A Financeit ajuda sua empresa a sair da experimentação fragmentada e avançar para uma operação preparada para gerar valor com IA de forma consistente.
          </p>
          <div className="mt-10">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/estruturacao-dados">
                Entenda como estruturar essa base
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VanguardSection;
