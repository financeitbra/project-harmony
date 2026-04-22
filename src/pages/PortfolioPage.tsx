import { Link } from "react-router-dom";
import {
  Stethoscope,
  HeartPulse,
  Activity,
  Pill,
  ScanLine,
  ClipboardList,
  Microscope,
  Syringe,
  ArrowRight,
  ShieldCheck,
  Brain,
  Database,
  BarChart3,
  Users,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

type Caso = {
  icon: React.ComponentType<{ className?: string }>;
  especialidade: string;
  dor: {
    titulo: string;
    sintomas: string[];
    descricao: string;
  };
  diagnostico: {
    titulo: string;
    metodo: string[];
    descricao: string;
  };
  tratamento: {
    titulo: string;
    produto: string;
    intervencao: string[];
    descricao: string;
    cta: { label: string; href: string };
  };
};

const casos: Caso[] = [
  {
    icon: Brain,
    especialidade: "Neurologia Estratégica",
    dor: {
      titulo: "Empresa que quer IA, mas não sabe por onde começar",
      sintomas: [
        "Pilotos de IA que não saem do PowerPoint",
        "Investimentos sem retorno mensurável",
        "Times paralisados pelo excesso de hype",
      ],
      descricao:
        "O paciente sente urgência em adotar IA, mas não tem clareza de onde aplicar, como medir e quem deve liderar. O resultado é estagnação cara e silenciosa.",
    },
    diagnostico: {
      titulo: "Diagnóstico de Prontidão para IA",
      metodo: [
        "Avaliação em 5 dimensões: dados, processos, pessoas, governança e tecnologia",
        "Mapeamento de casos de uso com retorno real",
        "Entrevistas com lideranças-chave",
      ],
      descricao:
        "Como um exame completo, mapeamos a maturidade da organização para identificar onde a IA cura e onde ela apenas mascara sintomas.",
    },
    tratamento: {
      titulo: "Esteira de Prontidão para IA",
      produto: "Prontidão para IA",
      intervencao: [
        "Roadmap priorizado por impacto",
        "Quick-wins em 90 dias",
        "Governança e arquitetura para escalar",
      ],
      descricao:
        "Tratamento que tira a IA do laboratório e a leva para a operação — com método, governança e velocidade.",
      cta: { label: "Ver tratamento completo", href: "/prontidao-ia" },
    },
  },
  {
    icon: Database,
    especialidade: "Cardiologia de Dados",
    dor: {
      titulo: "Decisões tomadas com dados desconfiáveis",
      sintomas: [
        "Múltiplas versões da verdade entre áreas",
        "Relatórios que demoram dias para sair",
        "Equipes refazendo planilhas manualmente",
      ],
      descricao:
        "Quando o coração da empresa — seus dados — bombeia informação inconsistente, cada decisão vira aposta. O custo invisível é gigante.",
    },
    diagnostico: {
      titulo: "Auditoria de Arquitetura e Governança",
      metodo: [
        "Mapeamento de fontes e fluxos de dados",
        "Análise de qualidade, latência e linhagem",
        "Avaliação de modelagem e governança",
      ],
      descricao:
        "Um eletrocardiograma completo do ecossistema de dados: identificamos arritmias, gargalos e pontos de ruptura antes que virem crise.",
    },
    tratamento: {
      titulo: "Estruturação de Dados de ponta a ponta",
      produto: "Estruturação de Dados",
      intervencao: [
        "Arquitetura moderna e escalável",
        "Modelagem dimensional e camada semântica",
        "Governança aplicada ao dia a dia",
      ],
      descricao:
        "Construímos a base sólida que sustenta BI, IA e decisões executivas com confiança absoluta.",
      cta: { label: "Ver tratamento completo", href: "/estruturacao-dados" },
    },
  },
  {
    icon: BarChart3,
    especialidade: "Oftalmologia Executiva",
    dor: {
      titulo: "Liderança sem visão clara do negócio",
      sintomas: [
        "Dashboards bonitos, mas sem ação",
        "KPIs que não conversam com a estratégia",
        "Reuniões longas sem decisão",
      ],
      descricao:
        "A empresa tem dados, tem ferramentas — mas a alta gestão continua míope. Falta o par de lentes certo para enxergar o que importa.",
    },
    diagnostico: {
      titulo: "Mapeamento de Indicadores Estratégicos",
      metodo: [
        "Workshops com C-level e líderes de área",
        "Definição de KPIs ligados à estratégia",
        "Modelagem de jornadas analíticas",
      ],
      descricao:
        "Ajustamos as lentes da liderança para que cada indicador conte uma história clara, acionável e conectada à estratégia.",
    },
    tratamento: {
      titulo: "Inteligência de Negócio aplicada",
      produto: "Inteligência de Negócio",
      intervencao: [
        "Dashboards executivos sob medida",
        "Cadência de revisão e ação",
        "Cultura de decisão orientada por dados",
      ],
      descricao:
        "Transformamos dados em decisão e decisão em resultado — com rituais, indicadores e visualizações que movem o negócio.",
      cta: { label: "Ver tratamento completo", href: "/inteligencia-negocios" },
    },
  },
  {
    icon: ShieldCheck,
    especialidade: "Imunologia Tributária",
    dor: {
      titulo: "Risco fiscal silencioso e custo tributário inflado",
      sintomas: [
        "Apurações manuais e propensas a erro",
        "Reforma tributária aumentando a complexidade",
        "Multas e contingências crescentes",
      ],
      descricao:
        "O sistema imunológico fiscal está fragilizado. Cada operação vira potencial passivo — e a reforma tributária só amplifica o risco.",
    },
    diagnostico: {
      titulo: "Avaliação de maturidade fiscal e tecnológica",
      metodo: [
        "Análise de processos fiscais ponta a ponta",
        "Mapeamento de integrações com ERP",
        "Avaliação de exposição à reforma tributária",
      ],
      descricao:
        "Como exames laboratoriais completos, identificamos vulnerabilidades fiscais antes que virem autuações.",
    },
    tratamento: {
      titulo: "Implementação Avalara com governança",
      produto: "Avalara",
      intervencao: [
        "Automação fiscal end-to-end",
        "Integração com ERPs e sistemas legados",
        "Governança contínua e atualização normativa",
      ],
      descricao:
        "Vacinamos sua operação fiscal contra erros, multas e complexidade — com tecnologia que se atualiza com a legislação.",
      cta: { label: "Ver tratamento completo", href: "/avalara" },
    },
  },
  {
    icon: Layers,
    especialidade: "Cirurgia de Integração",
    dor: {
      titulo: "Dados isolados em silos que não se comunicam",
      sintomas: [
        "Replicações intermináveis entre sistemas",
        "Custos crescentes de armazenamento",
        "Time perdido em ETLs frágeis",
      ],
      descricao:
        "Cada sistema é um órgão isolado. Sem integração viva, a empresa opera com retalhos — não com um corpo único.",
    },
    diagnostico: {
      titulo: "Mapa de fontes, latência e necessidade de tempo real",
      metodo: [
        "Inventário de fontes e consumidores",
        "Análise de latência e criticidade",
        "Modelo lógico de dados unificado",
      ],
      descricao:
        "Planejamos a cirurgia com precisão milimétrica: o que virtualizar, o que replicar e o que governar centralmente.",
    },
    tratamento: {
      titulo: "Virtualização de Dados com Denodo",
      produto: "Denodo",
      intervencao: [
        "Camada lógica de dados unificada",
        "Acesso em tempo real sem replicação",
        "Governança centralizada de acesso",
      ],
      descricao:
        "Conectamos órgãos isolados em um sistema vivo — com Denodo orquestrando dados onde quer que eles estejam.",
      cta: { label: "Ver tratamento completo", href: "/denodo" },
    },
  },
  {
    icon: Microscope,
    especialidade: "Medicina Diagnóstica",
    dor: {
      titulo: "Investimento em tecnologia sem prova de valor",
      sintomas: [
        "Compra de licenças subutilizadas",
        "Projetos longos sem entregáveis",
        "Insegurança da liderança em escalar",
      ],
      descricao:
        "Tratar sem diagnóstico é negligência. Escalar sem prova é desperdício. A empresa precisa de evidência antes do compromisso.",
    },
    diagnostico: {
      titulo: "Definição de hipótese e métricas de sucesso",
      metodo: [
        "Workshop de caso de uso prioritário",
        "Definição de critérios de sucesso mensuráveis",
        "Plano de execução em janelas curtas",
      ],
      descricao:
        "Antes de qualquer tratamento prolongado, validamos a hipótese clínica com rigor científico.",
    },
    tratamento: {
      titulo: "PPOV — Prova de Valor estruturada",
      produto: "PPOV",
      intervencao: [
        "Implementação focada em 4 a 8 semanas",
        "Resultados mensuráveis e auditáveis",
        "Decisão informada para escalar",
      ],
      descricao:
        "Uma biópsia técnica e estratégica: você só investe em escala depois de ver o resultado real, no seu contexto.",
      cta: { label: "Ver tratamento completo", href: "/ppov" },
    },
  },
  {
    icon: Users,
    especialidade: "Equipe Médica Especializada",
    dor: {
      titulo: "Falta de talento sênior para executar a estratégia",
      sintomas: [
        "Vagas críticas abertas há meses",
        "Squads com perfis genéricos",
        "Projetos travando por dependência de pessoas",
      ],
      descricao:
        "Sem o time clínico certo, nenhum tratamento avança. E o mercado de talentos sêniores em dados e IA é uma UTI lotada.",
    },
    diagnostico: {
      titulo: "Mapeamento de skills críticas e perfil cultural",
      metodo: [
        "Entendimento profundo do contexto técnico",
        "Calibração de senioridade e perfil",
        "Validação técnica e comportamental",
      ],
      descricao:
        "Diagnosticamos exatamente qual especialista resolve qual quadro — sem genéricos, sem improviso.",
    },
    tratamento: {
      titulo: "Hunting e Alocação de profissionais sêniores",
      produto: "Hunting & Alocação",
      intervencao: [
        "Hunting estratégico de profissionais raros",
        "Alocação de profissionais especializados sob demanda",
        "Alocação de squads completos",
        "Acompanhamento contínuo da entrega",
      ],
      descricao:
        "Colocamos os especialistas certos na sala de cirurgia certa, no momento certo — com método e velocidade.",
      cta: { label: "Ver tratamento completo", href: "/hunting-info" },
    },
  },
];

const PortfolioPage = () => {
  return (
    <div className="bg-background">
      <SEO
        title="Portfólio Financeit — Diagnóstico e Tratamento para Dados, BI e IA"
        description="Conheça o portfólio Financeit em uma jornada médica: a dor do mercado, nosso diagnóstico estruturado e o tratamento que entrega resultado real em dados, BI, governança e IA."
        keywords="portfólio Financeit, soluções, dados, BI, IA, governança, prontidão IA, Avalara, Denodo, Qlik"
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--navy))] via-[hsl(var(--petrol))] to-[hsl(var(--navy))] text-primary-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[hsl(var(--cyan-tech))]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[hsl(var(--cyan-glow))]/15 blur-3xl" />

        <div className="section-container relative py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--cyan-tech))]/30 bg-[hsl(var(--cyan-tech))]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--cyan-glow))]">
              <Stethoscope className="h-3.5 w-3.5" />
              Portfólio Financeit
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Sua empresa tem <span className="text-[hsl(var(--cyan-glow))]">sintomas</span>.
              <br />
              Nós entregamos o <span className="text-[hsl(var(--cyan-glow))]">tratamento</span>.
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              Como uma clínica de excelência em Dados, BI, IA e Talentos, a Financeit
              não vende soluções de prateleira. Diagnosticamos a dor real, prescrevemos o
              tratamento certo e acompanhamos a recuperação até o resultado final, de
              forma a deixar nosso paciente 100% satisfeito.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-[hsl(var(--cyan-tech))] text-white hover:bg-[hsl(var(--cyan-glow))]">
                <Link to="/contato">
                  Agendar consulta estratégica
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href="#casos">Ver especialidades clínicas</a>
              </Button>
            </div>
          </div>

          {/* Vital signs grid */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: HeartPulse, label: "Diagnóstico preciso" },
              { icon: ScanLine, label: "Visão completa" },
              { icon: Pill, label: "Tratamento sob medida" },
              { icon: Activity, label: "Acompanhamento contínuo" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-4 text-center backdrop-blur-sm"
              >
                <Icon className="mx-auto h-6 w-6 text-[hsl(var(--cyan-glow))]" />
                <p className="mt-2 text-xs font-medium text-primary-foreground/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="border-b border-border bg-card">
        <div className="section-container py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--cyan-tech))]">
                <span className="h-px w-6 bg-[hsl(var(--cyan-tech))]" />
                Nosso método
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Tratar sem diagnosticar é <span className="text-[hsl(var(--cyan-tech))]">negligência</span>.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                No mercado de tecnologia, é comum prescrever ferramentas antes de
                entender a dor e a real necessidade. A Financeit faz o oposto: ouvimos,
                examinamos, diagnosticamos — e só então prescrevemos o tratamento que cura.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Cada solução do nosso portfólio é uma especialidade clínica. Cada projeto,
                um plano terapêutico desenhado para o paciente — sua empresa.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-[hsl(var(--cyan-tech))]/10 to-[hsl(var(--navy))]/5 blur-2xl" />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: ClipboardList, title: "Anamnese", desc: "Escutamos seu negócio antes de qualquer proposta." },
                  { icon: Microscope, title: "Exame", desc: "Avaliação técnica e estratégica com método." },
                  { icon: Stethoscope, title: "Diagnóstico", desc: "Causas-raiz, não sintomas superficiais." },
                  { icon: Syringe, title: "Tratamento", desc: "Execução com governança e acompanhamento." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-[hsl(var(--cyan-tech))]/40 hover:shadow-lg"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[hsl(var(--cyan-tech))]/10 text-[hsl(var(--cyan-tech))]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASOS / ESPECIALIDADES */}
      <section id="casos" className="bg-background">
        <div className="section-container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--cyan-tech))]">
              <span className="h-px w-6 bg-[hsl(var(--cyan-tech))]" />
              Especialidades clínicas
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Cada dor exige uma especialidade.
              <br />
              <span className="text-[hsl(var(--cyan-tech))]">Aqui está o nosso corpo clínico.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Sete especialidades, uma única filosofia: diagnosticar antes de tratar,
              tratar antes de escalar.
            </p>
          </div>

          <div className="mt-20 space-y-12">
            {casos.map((caso, idx) => {
              const Icon = caso.icon;
              const isEven = idx % 2 === 0;
              return (
                <article
                  key={caso.especialidade}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:shadow-xl"
                >
                  {/* Accent stripe */}
                  <div
                    className={`absolute top-0 h-1 w-full bg-gradient-to-r ${
                      isEven
                        ? "from-[hsl(var(--cyan-tech))] via-[hsl(var(--cyan-glow))] to-transparent"
                        : "from-transparent via-[hsl(var(--cyan-glow))] to-[hsl(var(--cyan-tech))]"
                    }`}
                  />

                  <div className="grid gap-0 lg:grid-cols-12">
                    {/* Header coluna */}
                    <div className="relative bg-gradient-to-br from-[hsl(var(--navy))] to-[hsl(var(--petrol))] p-8 text-primary-foreground lg:col-span-3 lg:p-10">
                      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
                      <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[hsl(var(--cyan-tech))]/20 text-[hsl(var(--cyan-glow))] ring-1 ring-[hsl(var(--cyan-tech))]/30">
                          <Icon className="h-7 w-7" />
                        </div>
                        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--cyan-glow))]">
                          Especialidade {String(idx + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                          {caso.especialidade}
                        </h3>
                      </div>
                    </div>

                    {/* Conteúdo: Dor / Diagnóstico / Tratamento */}
                    <div className="grid gap-px bg-border lg:col-span-9 lg:grid-cols-3">
                      {/* DOR */}
                      <div className="bg-card p-8">
                        <div className="flex items-center gap-2">
                          <HeartPulse className="h-4 w-4 text-[hsl(var(--orange-accent))]" />
                          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--orange-accent))]">
                            A Dor
                          </span>
                        </div>
                        <h4 className="mt-3 font-display text-lg font-semibold text-foreground">
                          {caso.dor.titulo}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {caso.dor.descricao}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {caso.dor.sintomas.map((s) => (
                            <li
                              key={s}
                              className="flex items-start gap-2 text-sm text-foreground/80"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--orange-accent))]" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* DIAGNÓSTICO */}
                      <div className="bg-card p-8">
                        <div className="flex items-center gap-2">
                          <Microscope className="h-4 w-4 text-[hsl(var(--cyan-tech))]" />
                          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--cyan-tech))]">
                            Diagnóstico
                          </span>
                        </div>
                        <h4 className="mt-3 font-display text-lg font-semibold text-foreground">
                          {caso.diagnostico.titulo}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {caso.diagnostico.descricao}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {caso.diagnostico.metodo.map((s) => (
                            <li
                              key={s}
                              className="flex items-start gap-2 text-sm text-foreground/80"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--cyan-tech))]" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* TRATAMENTO */}
                      <div className="relative bg-gradient-to-br from-[hsl(var(--cyan-tech))]/5 to-[hsl(var(--navy))]/5 p-8">
                        <div className="flex items-center gap-2">
                          <Syringe className="h-4 w-4 text-[hsl(var(--green-accent))]" />
                          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--green-accent))]">
                            Tratamento
                          </span>
                        </div>
                        <h4 className="mt-3 font-display text-lg font-semibold text-foreground">
                          {caso.tratamento.titulo}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {caso.tratamento.descricao}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {caso.tratamento.intervencao.map((s) => (
                            <li
                              key={s}
                              className="flex items-start gap-2 text-sm text-foreground/80"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--green-accent))]" />
                              {s}
                            </li>
                          ))}
                        </ul>
                        <Button
                          asChild
                          size="sm"
                          className="mt-6 bg-[hsl(var(--navy))] text-primary-foreground hover:bg-[hsl(var(--petrol))]"
                        >
                          <Link to={caso.tratamento.cta.href}>
                            {caso.tratamento.cta.label}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* JURAMENTO / CTA FINAL */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--navy))] via-[hsl(var(--petrol))] to-[hsl(var(--navy))] text-primary-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[hsl(var(--cyan-tech))]/20 blur-3xl" />

        <div className="section-container relative py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Sparkles className="mx-auto h-8 w-8 text-[hsl(var(--cyan-glow))]" />
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              O nosso compromisso é com a sua{" "}
              <span className="text-[hsl(var(--cyan-glow))]">cura</span> — não com a venda.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
              Se sua empresa sente algum desses sintomas, a primeira consulta é por nossa
              conta. Vamos ouvir, examinar e desenhar com você o tratamento certo.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-[hsl(var(--cyan-tech))] text-white hover:bg-[hsl(var(--cyan-glow))]"
              >
                <Link to="/contato">
                  Agendar consulta estratégica
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/prontidao-ia/avaliacao">Fazer avaliação de prontidão</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
