import { ShieldCheck, Workflow, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const solucoes = [
  {
    icon: ShieldCheck,
    title: "Dados, Governança e Prontidão para IA",
    description: "Estruturação da base necessária para decisões melhores, evolução segura e aplicação de IA com critério.",
    link: "/prontidao-ia",
  },
  {
    icon: Workflow,
    title: "Esteira de Produtos de IA",
    description: "Organização dos elementos que sustentam produtos e operações orientados por IA com mais consistência, aderência e capacidade de escala.",
    link: "/solucoes/esteira-ia",
  },
];

const DadosGovernancaIA = () => {
  return (
    <section className="relative overflow-hidden section-padding">
      {/* Subtle navy background for emphasis */}
      <div className="absolute inset-0 bg-navy-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-tech/[0.04] blur-[120px]" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            Dados e IA
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            IA com valor real exige{" "}
            <span className="text-gradient">base sólida.</span>
          </h2>
          <p className="mt-5 text-primary-foreground/70 md:text-lg leading-relaxed max-w-2xl mx-auto">
            A adoção de IA sem dados confiáveis, governança e contexto operacional tende a gerar pilotos frágeis e pouco impacto no negócio. A Financeit ajuda sua empresa a estruturar a base necessária para operar com IA de forma mais consistente, segura e aderente.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {solucoes.map((s, i) => (
            <div
              key={s.title}
              className="group relative rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 md:p-10 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-primary-foreground/10"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15 transition-colors group-hover:bg-accent">
                <s.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-foreground">{s.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-primary-foreground/60">{s.description}</p>
              <Link
                to={s.link}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-cyan-glow"
              >
                Saiba mais <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              {/* Orange micro-accent on first card */}
              {i === 0 && (
                <div className="absolute left-0 top-8 h-8 w-0.5 rounded-full bg-orange-accent opacity-60" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/prontidao-ia">
              Avalie sua prontidão para IA
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DadosGovernancaIA;
