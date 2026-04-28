import SEO from "@/components/SEO";

// Disable lazy loading for the home page sections to prevent blank screens during hydration
import HeroSection from "@/components/sections/HeroSection";
import AIReadinessSection from "@/components/sections/AIReadinessSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import VanguardSection from "@/components/sections/VanguardSection";
import AIReadinessHighlight from "@/components/sections/AIReadinessHighlight";
import TalentsSection from "@/components/sections/TalentsSection";
import SpecializedSection from "@/components/sections/SpecializedSection";
import DifferentialsSection from "@/components/sections/DifferentialsSection";
import InstitutionalProofSection from "@/components/sections/InstitutionalProofSection";
import PartnersSection from "@/components/sections/PartnersSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <>
      <SEO
        title="Financeit — Inteligência de Negócio, Dados e IA"
        description="A Financeit conecta inteligência de negócio, dados, governança, tecnologia e IA para transformar a performance da sua empresa com clareza e capacidade real de entrega."
        keywords="inteligência de negócio, dados, governança, IA, prontidão IA, Qlik, Denodo, Avalara"
      />

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
    </>
  );
};

export default Index;