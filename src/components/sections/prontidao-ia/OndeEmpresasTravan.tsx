import { XCircle } from "lucide-react";

const barreiras = [
  "Dados fragmentados entre áreas",
  "Ausência de critérios de governança",
  "Pouca clareza sobre casos de uso prioritários",
  "Baixa conexão entre tecnologia e operação",
  "Dificuldade de transformar teste em processo escalável",
];

const OndeEmpresasTravan = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" />
            Barreiras comuns
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            A maior parte das iniciativas falha antes da tecnologia.{" "}
            <span className="text-gradient">Falha na base.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed max-w-2xl mx-auto">
            Na prática, o bloqueio mais comum não está no modelo ou na ferramenta. Está na ausência de estrutura organizacional, qualidade de dados, governança, definição de responsabilidade e leitura correta do problema que a empresa quer resolver.
          </p>
        </div>

        <div className="mt-14 mx-auto max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {barreiras.map((barreira, i) => (
              <div
                key={i}
                className="relative flex items-start gap-3 rounded-lg border border-border bg-card p-5 transition-all hover:border-accent/20 hover:shadow-sm"
              >
                <XCircle className={`mt-0.5 h-5 w-5 shrink-0 ${i === 0 ? 'text-orange-accent/70' : 'text-destructive/70'}`} />
                <p className="text-sm font-medium text-foreground md:text-base leading-snug">{barreira}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OndeEmpresasTravan;
