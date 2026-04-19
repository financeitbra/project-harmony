import { Calendar, Globe, Handshake, Sparkles } from "lucide-react";

const proofs = [
  { icon: Calendar, title: "Desde 2011", description: "Mais de uma década conectando tecnologia e resultado." },
  { icon: Globe, title: "Atuação em diferentes mercados", description: "Experiência multissetorial em contextos de alta exigência." },
  { icon: Handshake, title: "Ecossistema de parceiros estratégicos", description: "Parcerias que ampliam alcance e profundidade de entrega." },
  { icon: Sparkles, title: "Visão aplicada de IA, dados e governança", description: "Maturidade para transformar inteligência em execução real." },
];

const InstitutionalProofSection = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Experiência para estruturar o presente.{" "}
            <span className="text-accent">Visão para construir a próxima curva.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed">
            Desde 2011, a Financeit evolui sua atuação conectando tecnologia, talentos e execução em contextos de alta exigência. Hoje, amplia essa capacidade com uma visão madura de dados, governança e inteligência artificial aplicada ao negócio.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {proofs.map((p, i) => (
            <div key={p.title} className="rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-accent/30 hover:shadow-md">
              <div className={`mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-md ${i === 0 ? 'bg-orange-accent/10' : 'bg-accent/10'}`}>
                <p.icon className={`h-5 w-5 ${i === 0 ? 'text-orange-accent' : 'text-accent'}`} />
              </div>
              <h3 className="font-display text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutionalProofSection;
