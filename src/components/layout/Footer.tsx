import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Soluções",
    links: [
      { label: "Visão Geral", path: "/solucoes" },
      { label: "Qlik", path: "/qlik" },
      { label: "Denodo", path: "/denodo" },
      { label: "Avalara", path: "/avalara" },
      { label: "PPOV", path: "/ppov" },
      { label: "Inteligência de Negócio", path: "/inteligencia-negocios" },
    ],
  },
  {
    title: "IA e Dados",
    links: [
      { label: "Prontidão para IA", path: "/prontidao-ia" },
      { label: "Avalie sua Prontidão", path: "/avalie-prontidao-ia" },
      { label: "Estruturação de Dados", path: "/estruturacao-dados" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Quem Somos", path: "/quem-somos" },
      { label: "Fale Conosco", path: "/contato" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-navy-gradient text-primary-foreground">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center">
              <img src="/logo-financeit.png" alt="FinanceIT" className="h-[50.8px] w-auto brightness-0 invert" />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Inteligência de negócio. Talentos, tecnologia, dados, governança e execução conectados para transformar empresas.
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-primary-foreground/40">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-primary-foreground/65 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/35">
            © {new Date().getFullYear()} FinanceIT. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1">
            <div className="h-1 w-1 rounded-full bg-orange-accent" />
            <span className="text-xs text-primary-foreground/25">São Paulo, Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
