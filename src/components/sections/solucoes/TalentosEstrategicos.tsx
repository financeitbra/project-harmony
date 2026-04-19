import { Search, UserCheck, UsersRound, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const solucoes = [
  {
    icon: Search,
    title: "Hunting de Profissionais de TI",
    description: "Busca ativa para posições estratégicas e perfis de alta criticidade, com foco em precisão, contexto e qualidade de aderência.",
    link: "/contato",
  },
  {
    icon: UserCheck,
    title: "Recrutamento e Seleção",
    description: "Processos estruturados para contratar melhor, reduzir ruído e aumentar a assertividade nas decisões de contratação.",
    link: "/contato",
  },
  {
    icon: UsersRound,
    title: "Alocação de Profissionais",
    description: "Mais agilidade para ampliar capacidade operacional com especialistas aderentes ao contexto do cliente.",
    link: "/contato",
  },
];

const TalentosEstrategicos = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-4 bg-orange-accent" />
            <span className="h-px w-6 bg-accent" />
            Talentos
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Talentos certos para demandas que exigem velocidade, aderência e{" "}
            <span className="text-accent">capacidade real de entrega.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed">
            A Financeit apoia empresas que precisam contratar melhor e reduzir o tempo entre a necessidade e a entrada em operação. Nosso foco não é apenas preencher posições, mas estruturar capacidade de execução.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {solucoes.map((s) => (
            <div
              key={s.title}
              className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:shadow-lg"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <s.icon className="h-5 w-5 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <Link
                to={s.link}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
              >
                Saiba mais <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/contato">
              Fale com um especialista em talentos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TalentosEstrategicos;
