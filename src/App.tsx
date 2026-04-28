import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PublicLayout from "@/components/layout/PublicLayout";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import AppErrorBoundary from "@/components/AppErrorBoundary";

// Lazy-load all pages to isolate potential import errors
const Index = lazy(() => import("./pages/Index"));
const QuemSomosPage = lazy(() => import("./pages/QuemSomosPage"));
const SolucoesPage = lazy(() => import("./pages/SolucoesPage"));
const ProntidaoIAPage = lazy(() => import("./pages/ProntidaoIAPage"));
const AvaliacaoIAPage = lazy(() => import("./pages/AvaliacaoIAPage"));
const AvaliacaoResultadoPage = lazy(() => import("./pages/AvaliacaoResultadoPage"));
const DiagnosticoIAPage = lazy(() => import("./pages/DiagnosticoIAPage"));
const AvalaraPage = lazy(() => import("./pages/AvalaraPage"));
const PPOVPage = lazy(() => import("./pages/PPOVPage"));
const QlikPage = lazy(() => import("./pages/QlikPage"));
const DenodoPage = lazy(() => import("./pages/DenodoPage"));
const EstruturacaoDadosPage = lazy(() => import("./pages/EstruturacaoDadosPage"));
const AvalieProntidaoPage = lazy(() => import("./pages/AvalieProntidaoPage"));
const ContatoPage = lazy(() => import("./pages/ContatoPage"));
const InteligenciaNegocioPage = lazy(() => import("./pages/InteligenciaNegocioPage"));
const HuntingInfoPage = lazy(() => import("./pages/HuntingInfoPage"));
const AllocationInfoPage = lazy(() => import("./pages/AllocationInfoPage"));
const PoliticaPrivacidadePage = lazy(() => import("./pages/PoliticaPrivacidadePage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LoginPage = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPassword"));

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#0F172A] text-white">
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-sm font-medium">Carregando plataforma...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Navigation to:", location.pathname);
  }, [location]);

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomosPage />} />
          <Route path="/solucoes" element={<SolucoesPage />} />
          <Route path="/solucoes/execucao" element={<SolucoesPage />} />
          <Route path="/solucoes/squads" element={<SolucoesPage />} />
          <Route path="/solucoes/software" element={<SolucoesPage />} />
          <Route path="/solucoes/esteira-ia" element={<ProntidaoIAPage />} />
          <Route path="/prontidao-ia" element={<ProntidaoIAPage />} />
          <Route path="/prontidao-ia/avaliacao" element={<AvaliacaoIAPage />} />
          <Route path="/prontidao-ia/resultado" element={<AvaliacaoResultadoPage />} />
          <Route path="/prontidao-ia/diagnostico" element={<DiagnosticoIAPage />} />
          <Route path="/avaliacao-ia" element={<AvaliacaoIAPage />} />
          <Route path="/avaliacao-ia/resultado" element={<AvaliacaoResultadoPage />} />
          <Route path="/diagnostico-ia" element={<DiagnosticoIAPage />} />
          <Route path="/inteligencia-negocios" element={<InteligenciaNegocioPage />} />
          <Route path="/avalara" element={<AvalaraPage />} />
          <Route path="/ppov" element={<PPOVPage />} />
          <Route path="/qlik" element={<QlikPage />} />
          <Route path="/denodo" element={<DenodoPage />} />
          <Route path="/estruturacao-dados" element={<EstruturacaoDadosPage />} />
          <Route path="/avalie-prontidao-ia" element={<AvalieProntidaoPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/hunting-info" element={<HuntingInfoPage />} />
          <Route path="/alocacao-info" element={<AllocationInfoPage />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidadePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <AppContent />
          <WhatsAppButton />
          <CookieBanner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AppErrorBoundary>
);

export default App;