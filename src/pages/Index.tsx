import { lazy, Suspense } from "react";
import SEO from "@/components/SEO";

const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const AIReadinessSection = lazy(() => import("@/components/sections/AIReadinessSection"));
const SolutionsSection = lazy(() => import("@/components/sections/SolutionsSection"));
const VanguardSection = lazy(() => import("@/components/sections/VanguardSection"));
const AIReadinessHighlight = lazy(() => import("@/components/sections/AIReadinessHighlight"));
const TalentsSection = lazy(() => import("@/components/sections/TalentsSection"));
const SpecializedSection = lazy(() => import("@/components/sections/SpecializedSection"));
const DifferentialsSection = lazy(() => import("@/components/sections/DifferentialsSection"));
const InstitutionalProofSection = lazy(() => import("@/components/sections/InstitutionalProofSection"));
const PartnersSection = lazy(() => import("@/components/sections/PartnersSection"));
const CTASection = lazy(() => import("@/components/sections/CTASection"));

const Index = () => {
  return (
    <>
      <SEO
        title="Financeit — Inteligência de Negócio, Dados e IA"
        description="A Financeit conecta inteligência de negócio, dados, governança, tecnologia e IA para transformar a performance da sua empresa com clareza e capacidade real de entrega."
        keywords="inteligência de negócio, dados, governança, IA, prontidão IA, Qlik, Denodo, Avalara"
      />

      <Suspense fallback={<div className="h-96 w-full animate-pulse bg-slate-900/10" />}>
        <HeroSection />
        <AIReadinessSection />
        <SolutionsSection />
        <VanguardSection />
        <AIReadinessHighlight />
        <TalentsSection />
        <SpecializedSection />
        <DifferentialsSection />
        <InstitutionalProofSection />
        <PartnersSection />
        <CTASection />
      </Suspense>
    </>
  );
};

export default Index;
