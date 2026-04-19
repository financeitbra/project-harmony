import { ArrowRight, Search, UserCheck, UsersRound, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const talents = [
  {
    icon: Search,
    title: "Hunting de Profissionais de TI",
    description: "Busca ativa e qualificada para posições críticas em tecnologia.",
  },
  {
    icon: UserCheck,
    title: "Recrutamento e Seleção",
    description: "Processos seletivos estruturados com foco em aderência técnica e cultural.",
  },
  {
    icon: UsersRound,
    title: "Alocação de Profissionais",
    description: "Profissionais prontos para integrar operações com velocidade e consistência.",
  },
  {
    icon: Layers,
    title: "Alocação de Squads",
    description: "Times estruturados para sustentar entregas com ritmo, qualidade e governança.",
  },
];

const TalentsSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Mais capacidade de entrega.{" "}
            <span className="text-accent">Menos atrito entre decisão e execução.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed">
            A Financeit combina hunting, recrutamento, alocação de profissionais e squads para ajudar empresas a avançar com velocidade, controle e aderência real às suas prioridades.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {talents.map((t) => (
            <div
              key={t.title}
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-lg"
            >
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-md transition-colors group-hover:bg-accent group-hover:text-accent-foreground ${t.title === 'Hunting de Profissionais de TI' ? 'bg-orange-accent/10' : 'bg-accent/10'}`}>
                <t.icon className={`h-5 w-5 group-hover:text-accent-foreground ${t.title === 'Hunting de Profissionais de TI' ? 'text-orange-accent' : 'text-accent'}`} />
              </div>
              <h3 className="font-display text-base font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/contato">
              Fale com um especialista
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TalentsSection;
