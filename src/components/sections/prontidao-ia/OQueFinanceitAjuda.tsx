import { Search, Database, Shield, Target, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const blocos = [
  {
    icon: Search,
    title: "Diagnóstico de maturidade",
    description: "Leitura estruturada do estágio atual da empresa em dados, governança, contexto operacional e capacidade de execução.",
  },
  {
    icon: Database,
    title: "Qualidade e organização de dados",
    description: "Identificação dos elementos necessários para tornar a base de dados mais útil, confiável e aplicável.",
  },
  {
    icon: Shield,
    title: "Governança e critérios de uso",
    description: "Estruturação de responsabilidades, políticas e critérios para adoção segura e consistente de IA.",
  },
  {
    icon: Target,
    title: "Priorização de casos de uso",
    description: "Definição de iniciativas com aderência ao negócio e maior potencial de impacto prático.",
  },
  {
    icon: TrendingUp,
    title: "Estrutura para evolução",
    description: "Base para que a empresa avance com mais segurança, coerência e capacidade de escala.",
  },
];

const OQueFinanceitAjuda = () => {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 bg-navy-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-tech/[0.04] blur-[120px]" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            Nossa atuação
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            A Financeit ajuda sua empresa a construir{" "}
            <span className="text-gradient">a base que sustenta IA com valor real.</span>
          </h2>
          <p className="mt-5 text-primary-foreground/70 md:text-lg leading-relaxed max-w-2xl mx-auto">
            Nossa atuação em prontidão para IA combina visão de negócio, dados, governança, tecnologia e execução para ajudar empresas a sair da experimentação difusa e avançar para uma estrutura mais madura, aderente e escalável.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blocos.map((bloco, i) => (
            <div
              key={bloco.title}
              className={`group relative rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-primary-foreground/10 ${
                i >= 3 ? "lg:col-span-1" : ""
              }`}
            >
              {i === 0 && (
                <div className="absolute left-0 top-8 h-8 w-0.5 rounded-full bg-orange-accent opacity-60" />
              )}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15 transition-colors group-hover:bg-accent">
                <bloco.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary-foreground">{bloco.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/60 md:text-base">{bloco.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/prontidao-ia/avaliacao">
              Avaliar maturidade de dados e IA
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OQueFinanceitAjuda;
