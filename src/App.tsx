import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import WhatsAppButton from "./components/WhatsAppButton";
import CookieBanner from "./components/CookieBanner";
import AppErrorBoundary from "./components/AppErrorBoundary";

// Layout
import PublicLayout from "./components/layout/PublicLayout";

// Direct imports for all pages to avoid any potential lazy loading issues
import Index from "./pages/Index";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SolucoesPage from "./pages/SolucoesPage";
import ContatoPage from "./pages/ContatoPage";
import PortfolioPage from "./pages/Portfolio";
import QuemSomosPage from "./pages/QuemSomosPage";
import ProntidaoIAPage from "./pages/ProntidaoIAPage";
import InteligenciaNegocioPage from "./pages/InteligenciaNegocioPage";
import HuntingInfoPage from "./pages/HuntingInfoPage";
import AllocationInfoPage from "./pages/AllocationInfoPage";
import PoliticaPrivacidadePage from "./pages/PoliticaPrivacidadePage";
import AvalaraPage from "./pages/AvalaraPage";
import QlikPage from "./pages/QlikPage";
import DenodoPage from "./pages/DenodoPage";
import EstruturacaoDadosPage from "./pages/EstruturacaoDadosPage";
import AvalieProntidaoPage from "./pages/AvalieProntidaoPage";
import ResetPasswordPage from "./pages/ResetPassword";
import AvaliacaoIAPage from "./pages/AvaliacaoIAPage";
import AvaliacaoResultadoPage from "./pages/AvaliacaoResultadoPage";
import DiagnosticoIAPage from "./pages/DiagnosticoIAPage";
import PPOVPage from "./pages/PPOVPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log("App.tsx: App component rendering...");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppErrorBoundary>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <ScrollToTop />
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
            <WhatsAppButton />
            <CookieBanner />
          </BrowserRouter>
        </AppErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;