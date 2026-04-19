import { BarChart3, Network, Receipt, PieChart } from "lucide-react";

const partners = [
  { name: "Qlik", icon: BarChart3, accent: false },
  { name: "Denodo", icon: Network, accent: false },
  { name: "Avalara", icon: Receipt, accent: true },
  { name: "PPOV", icon: PieChart, accent: false },
];

const PartnersSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Parcerias que ampliam capacidade, profundidade e{" "}
            <span className="text-accent">valor entregue.</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg leading-relaxed">
            A Financeit fortalece sua atuação com parceiros estratégicos que ampliam o alcance das soluções entregues aos clientes.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className={`flex h-16 items-center gap-3 rounded-lg border bg-card px-10 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground ${partner.accent ? 'border-orange-accent/20 hover:border-orange-accent/40' : 'border-border hover:border-accent/30'}`}
            >
              <partner.icon className={`h-5 w-5 ${partner.accent ? 'text-orange-accent' : 'text-accent'}`} />
              {partner.name}
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Mais do que tecnologia, essas parcerias reforçam a capacidade da Financeit de estruturar soluções aderentes ao negócio, com mais eficiência, inteligência e controle.
        </p>
      </div>
    </section>
  );
};

export default PartnersSection;
