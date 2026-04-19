import { ArrowRight, Receipt, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SpecializedSection = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Inteligência de negócio também se constrói{" "}
            <span className="text-accent">nas áreas críticas da operação.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* Avalara */}
          <div className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-orange-accent/30 hover:shadow-lg md:p-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-accent/10">
              <Receipt className="h-6 w-6 text-orange-accent" />
            </div>
            <h3 className="font-display text-xl font-bold">Soluções Fiscais com Avalara</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Mais automação, compliance e segurança para operações fiscais que exigem controle, precisão e escalabilidade.
            </p>
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to="/avalara">
                  Conheça a solução
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* PPOV */}
          <div className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-green-accent/30 hover:shadow-lg md:p-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-green-accent/10">
              <PieChart className="h-6 w-6 text-green-accent" />
            </div>
            <h3 className="font-display text-xl font-bold">Gestão de Orçamento e Resultado com PPOV</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Mais visibilidade, planejamento e inteligência gerencial para decisões orientadas por desempenho.
            </p>
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to="/ppov">
                  Explore a solução
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializedSection;
