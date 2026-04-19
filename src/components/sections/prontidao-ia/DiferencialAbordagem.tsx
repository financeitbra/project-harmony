import { CheckCircle2 } from "lucide-react";

const diferenciais = [
  "IA tratada com maturidade, não com hype",
  "Foco em aderência ao negócio",
  "Conexão entre dados, governança e execução",
  "Visão estrutural, não cosmética",
  "Capacidade de traduzir complexidade em direção prática",
];

const DiferencialAbordagem = () => {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 bg-navy-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute right-[15%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-cyan-tech/[0.04] blur-[120px]" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            Diferencial
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            O diferencial não está em falar de IA.{" "}
            <span className="text-gradient">Está em estruturar as condições para ela gerar valor.</span>
          </h2>
          <p className="mt-5 text-primary-foreground/70 md:text-lg leading-relaxed max-w-2xl mx-auto">
            A Financeit trata prontidão para IA como uma questão de arquitetura de negócio, e não apenas de tecnologia. Por isso, nossa abordagem combina visão estratégica, leitura operacional e estruturação prática dos elementos que sustentam valor real.
          </p>
        </div>

        <div className="mt-14 mx-auto max-w-2xl">
          <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 md:p-10 backdrop-blur-sm">
            <div className="space-y-5">
              {diferenciais.map((diferencial, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${i === 0 ? 'bg-orange-accent/15' : 'bg-accent/15'}`}>
                    <CheckCircle2 className={`h-4 w-4 ${i === 0 ? 'text-orange-accent' : 'text-accent'}`} />
                  </div>
                  <p className="text-sm font-medium text-primary-foreground md:text-base">{diferencial}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiferencialAbordagem;
