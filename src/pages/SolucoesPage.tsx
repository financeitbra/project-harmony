import { lazy, Suspense } from "react";

const SolucoesHero = lazy(() => import("@/components/sections/solucoes/SolucoesHero"));
const OfertaVisaoGeral = lazy(() => import("@/components/sections/solucoes/OfertaVisaoGeral"));
const TalentosEstrategicos = lazy(() => import("@/components/sections/solucoes/TalentosEstrategicos"));
const ExecucaoEscalavel = lazy(() => import("@/components/sections/solucoes/ExecucaoEscalavel"));
const InteligenciaNegocio = lazy(() => import("@/components/sections/solucoes/InteligenciaNegocio"));
const DadosGovernancaIA = lazy(() => import("@/components/sections/solucoes/DadosGovernancaIA"));
const SolucoesEspecializadas = lazy(() => import("@/components/sections/solucoes/SolucoesEspecializadas"));
const IntegracaoFrente = lazy(() => import("@/components/sections/solucoes/IntegracaoFrente"));
const ParaEmpresasQue = lazy(() => import("@/components/sections/solucoes/ParaEmpresasQue"));
const SolucoesCTAFinal = lazy(() => import("@/components/sections/solucoes/SolucoesCTAFinal"));

const SolucoesPage = () => {
  return (
    <Suspense fallback={<div className="h-96 w-full animate-pulse bg-slate-900/10" />}>
      <SolucoesHero />
      <OfertaVisaoGeral />
      <TalentosEstrategicos />
      <ExecucaoEscalavel />
      <InteligenciaNegocio />
      <DadosGovernancaIA />
      <SolucoesEspecializadas />
      <IntegracaoFrente />
      <ParaEmpresasQue />
      <SolucoesCTAFinal />
    </Suspense>
  );
};

export default SolucoesPage;
