import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PublicLayout from "@/components/layout/PublicLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import QuemSomosPage from "./pages/QuemSomosPage";
import SolucoesPage from "./pages/SolucoesPage";
import ProntidaoIAPage from "./pages/ProntidaoIAPage";
import AvaliacaoIAPage from "./pages/AvaliacaoIAPage";
import AvaliacaoResultadoPage from "./pages/AvaliacaoResultadoPage";
import DiagnosticoIAPage from "./pages/DiagnosticoIAPage";
import AvalaraPage from "./pages/AvalaraPage";
import PPOVPage from "./pages/PPOVPage";
import QlikPage from "./pages/QlikPage";
import DenodoPage from "./pages/DenodoPage";
import EstruturacaoDadosPage from "./pages/EstruturacaoDadosPage";
import AvalieProntidaoPage from "./pages/AvalieProntidaoPage";
import ContatoPage from "./pages/ContatoPage";
import InteligenciaNegocioPage from "./pages/InteligenciaNegocioPage";

import HuntingInfoPage from "./pages/HuntingInfoPage";
import AllocationInfoPage from "./pages/AllocationInfoPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/quem-somos" element={<QuemSomosPage />} />
            <Route path="/solucoes" element={<SolucoesPage />} />
            <Route path="/prontidao-ia" element={<ProntidaoIAPage />} />
            <Route path="/prontidao-ia/avaliacao" element={<AvaliacaoIAPage />} />
            <Route path="/prontidao-ia/resultado" element={<AvaliacaoResultadoPage />} />
            <Route path="/prontidao-ia/diagnostico" element={<DiagnosticoIAPage />} />
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
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
