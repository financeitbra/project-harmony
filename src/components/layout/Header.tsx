import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Target, Users, BarChart3, Network, Receipt, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoFinanceit from "@/assets/logo-financeit.png";

const navItems = [
  { label: "Quem Somos", path: "/quem-somos" },
  {
    label: "Soluções",
    path: "/solucoes",
    children: [
      { label: "Qlik", path: "/qlik", icon: BarChart3 },
      { label: "Denodo", path: "/denodo", icon: Network },
      { label: "Avalara", path: "/avalara", icon: Receipt },
      { label: "PPOV", path: "/ppov", icon: PieChart },
    ],
    services: [
      {
        label: "Hunting de Profissionais de TI",
        path: "/hunting-info",
        description: "Encontre os melhores talentos em TI",
        icon: "hunting" as const,
      },
      {
        label: "Alocação de Profissionais de TI",
        path: "/alocacao-info",
        description: "Gerencie a alocação de sua equipe",
        icon: "allocation" as const,
      },
    ],
  },
  { label: "Prontidão para IA", path: "/prontidao-ia" },
  { label: "Inteligência de Negócio", path: "/inteligencia-negocios" },
  { label: "Contato", path: "/contato" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="FinanceIT - Inteligência de Negócio">
          <img src={logoFinanceit} alt="FinanceIT - Inteligência de Negócio" className="h-10 w-auto lg:h-12" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors hover:bg-secondary hover:text-foreground ${
                    location.pathname.startsWith("/solucoes") ||
                    location.pathname === "/qlik" ||
                    location.pathname === "/denodo" ||
                    location.pathname === "/avalara" ||
                    location.pathname === "/ppov" ||
                    location.pathname === "/hunting-info" ||
                    location.pathname === "/alocacao-info"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="h-3 w-3" />
                </Link>
                {dropdownOpen && (
                  <div className="absolute left-0 top-full pt-1">
                    <div className="min-w-[280px] rounded-lg border border-border bg-popover p-1.5 shadow-lg">
                      <Link
                        to={item.path}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                      >
                        Visão Geral
                      </Link>
                      <div className="my-1 h-px bg-border" />
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                            location.pathname === child.path
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {child.icon && <child.icon className="h-4 w-4 text-accent" />}
                          {child.label}
                        </Link>
                      ))}

                      {/* Services separator & items */}
                      {item.services && (
                        <>
                          <div className="my-1.5 h-px bg-border" />
                          {item.services.map((svc) => (
                            <Link
                              key={svc.path}
                              to={svc.path}
                              className={`flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent/5 ${
                                location.pathname === svc.path
                                  ? "bg-accent/5"
                                  : ""
                              }`}
                            >
                              <span className="mt-0.5">
                                {svc.icon === "hunting" ? (
                                  <Target className="h-5 w-5 text-orange-accent" />
                                ) : (
                                  <Users className="h-5 w-5 text-primary" />
                                )}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-foreground">
                                  {svc.label}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                  {svc.description}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors hover:bg-secondary hover:text-foreground ${
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/contato">Fale Conosco</Link>
          </Button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground xl:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-6 py-4 xl:hidden">
          <div className="flex flex-col gap-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${location.pathname === "/" ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>Home</Link>
            {navItems.map((item) => (
              <div key={item.path}>
                <Link to={item.path} onClick={() => setMobileOpen(false)} className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors block ${location.pathname === item.path ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>{item.label}</Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link key={child.path} to={child.path} onClick={() => setMobileOpen(false)} className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${location.pathname === child.path ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                        {child.icon && <child.icon className="h-4 w-4 text-accent" />}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
                {/* Mobile services */}
                {item.services && (
                  <div className="ml-4 mt-1 space-y-1 border-t border-border/50 pt-1">
                    {item.services.map((svc) => (
                      <Link
                        key={svc.path}
                        to={svc.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          location.pathname === svc.path
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {svc.icon === "hunting" ? (
                          <Target className="h-4 w-4 text-orange-accent" />
                        ) : (
                          <Users className="h-4 w-4 text-primary" />
                        )}
                        {svc.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button size="sm" className="mt-3 w-full sm:hidden" asChild>
              <Link to="/contato" onClick={() => setMobileOpen(false)}>Fale Conosco</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
