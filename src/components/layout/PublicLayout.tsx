import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SEO from "@/components/SEO";

type PageMeta = { title: string; description: string; keywords?: string };

const PAGE_META: Record<string, PageMeta> = {
  "/quem-somos": {
    title: "Quem Somos — Financeit",
    description: "Conheça a Financeit: time sênior em inteligência de negócio, dados, governança e IA, com entregas reais para empresas que querem performance.",
    keywords: "Financeit, sobre, consultoria, time, propósito",
  },
  "/solucoes": {
    title: "Soluções — Inteligência, Dados e Execução",
    description: "Soluções Financeit: inteligência de negócio, dados e governança, integração, execução escalável e talentos estratégicos para o seu time.",
    keywords: "soluções, BI, dados, governança, execução, squads",
  },
  "/inteligencia-negocios": {
    title: "Inteligência de Negócio — Financeit",
    description: "Transforme dados em decisões com a abordagem Financeit de inteligência de negócio: indicadores, dashboards e governança aplicadas ao seu contexto.",
    keywords: "BI, business intelligence, KPIs, dashboards, decisões",
  },
  "/prontidao-ia": {
    title: "Prontidão para IA — Diagnóstico e Roadmap",
    description: "Avalie a prontidão da sua empresa para IA. Diagnóstico em 5 dimensões e roadmap prático para sair do piloto e escalar com governança.",
    keywords: "prontidão IA, diagnóstico IA, governança IA, roadmap IA",
  },
  "/prontidao-ia/avaliacao": {
    title: "Avaliação de Prontidão para IA — Financeit",
    description: "Responda a avaliação Financeit de prontidão para IA e receba um diagnóstico estruturado por dimensão com recomendações práticas.",
    keywords: "avaliação IA, maturidade IA, assessment IA",
  },
  "/avalie-prontidao-ia": {
    title: "Avalie a Prontidão da sua Empresa para IA",
    description: "Entenda os fundamentos de prontidão para IA e faça a avaliação Financeit em poucos minutos.",
  },
  "/estruturacao-dados": {
    title: "Estruturação de Dados — Financeit",
    description: "Construímos a base de dados que sua empresa precisa: arquitetura, modelagem, qualidade e governança para sustentar BI e IA.",
    keywords: "estruturação de dados, arquitetura, modelagem, qualidade",
  },
  "/avalara": {
    title: "Avalara — Automação Tributária com a Financeit",
    description: "Implementação e suporte Avalara pela Financeit: automação tributária com governança, integração e foco em resultado.",
    keywords: "Avalara, automação tributária, fiscal, compliance",
  },
  "/qlik": {
    title: "Qlik — Analytics e Integração de Dados",
    description: "Soluções Qlik com a Financeit: analytics, integração de dados e Qlik Cloud para acelerar decisões orientadas por dados.",
    keywords: "Qlik, Qlik Sense, Qlik Cloud, analytics",
  },
  "/denodo": {
    title: "Denodo — Virtualização de Dados",
    description: "Denodo with Financeit: data fabric and data virtualization to access and govern distributed information in real time.",
    keywords: "Denodo, virtualização de dados, data fabric",
  },
  "/ppov": {
    title: "PPOV — Prova de Valor com a Financeit",
    description: "Prova de valor (PPOV) Financeit: validação prática de tecnologia e caso de uso antes do investimento em escala.",
    keywords: "PPOV, prova de valor, POC, validação",
  },
  "/hunting-info": {
    title: "Hunting de Talentos — Financeit",
    description: "Hunting estratégico de profissionais sêniores em dados, BI, IA e tecnologia, com método e velocidade.",
    keywords: "hunting, recrutamento, talentos, dados, IA",
  },
  "/alocacao-info": {
    title: "Alocação de Talentos — Financeit",
    description: "Alocação de squads e profissionais especializados para acelerar entregas em dados, BI e IA.",
    keywords: "alocação, squads, outsourcing, body shop",
  },
  "/contato": {
    title: "Contato — Fale com a Financeit",
    description: "Fale com a Financeit. Conte seu desafio em inteligência de negócio, dados, governança ou IA e construímos a melhor abordagem.",
    keywords: "contato, fale conosco, Financeit",
  },
  "/politica-privacidade": {
    title: "Política de Privacidade — Financeit",
    description: "Saiba como a Financeit coleta, usa e protege seus dados pessoais em conformidade com a LGPD.",
    keywords: "política de privacidade, LGPD, proteção de dados, Financeit",
  },
  "/login": {
    title: "Login — Financeit",
    description: "Acesse a área logada da Financeit.",
  },
  "/reset-password": {
    title: "Atualizar Senha — Financeit",
    description: "Atualize sua senha para continuar acessando a plataforma.",
  },
  "/dashboard": {
    title: "Dashboard — Financeit",
    description: "Área administrativa e de colaboradores.",
  },
};

const PublicLayout = () => {
  const { pathname } = useLocation();
  console.log("PublicLayout.tsx: Rendering route:", pathname);
  
  const meta = PAGE_META[pathname] || {
    title: "Financeit",
    description: "Inteligência de Negócio, Dados e IA"
  };

  // Auth and Dashboard pages don't show header/footer to avoid layout conflicts
  const isAuthPage = pathname === "/login" || pathname === "/reset-password" || pathname === "/dashboard";

  try {
    if (isAuthPage) {
      return (
        <div className="flex min-h-screen flex-col bg-slate-50/50">
          <SEO title={meta.title} description={meta.description} />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      );
    }

    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SEO 
          title={meta.title} 
          description={meta.description} 
          keywords={meta.keywords} 
        />
        <Header />
        <main className="flex-1 pt-16 lg:pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("PublicLayout Render Error:", error);
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">Erro de Layout</h1>
        <p>Houve um problema ao carregar esta página.</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-primary text-white rounded">
          Tentar novamente
        </button>
      </div>
    );
  }
};

export default PublicLayout;