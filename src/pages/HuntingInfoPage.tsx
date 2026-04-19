import { Target, Users, Zap, TrendingUp, ShieldCheck, Brain, BarChart3, Clock, CheckCircle2, Award } from "lucide-react";
import InfoPageLayout from "@/components/services/InfoPageLayout";
import HuntingFAQ from "@/components/sections/hunting/HuntingFAQ";

const HuntingInfoPage = () => (
  <div>
    <InfoPageLayout
      title="Hunting de Profissionais de TI"
      subtitle="Recrutamento estratégico para posições críticas em tecnologia — com inteligência de mercado, IA aplicada e profundo conhecimento técnico."
      heroDescription="O Hunting da FinanceIT vai além da busca por currículos. Combinamos inteligência artificial, mapeamento ativo de mercado e avaliação técnica aprofundada para identificar, atrair e posicionar os profissionais mais aderentes às suas demandas. Nosso processo reduz o time-to-fill em até 40%, eleva a taxa de retenção acima de 85% após 12 meses e garante que cada contratação gere impacto real no seu negócio."
      ctaText="Fale com um Especialista"
      ctaHref="/contato"
      benefits={[
        {
          icon: <Brain className="h-6 w-6" />,
          title: "IA Aplicada ao Recrutamento",
          description:
            "Triagem inteligente de candidatos, scoring automatizado e matching multicritério — stack técnico, senioridade, fit cultural e expectativas salariais — para identificar os perfis mais aderentes com velocidade e precisão.",
        },
        {
          icon: <Target className="h-6 w-6" />,
          title: "Hunting Ativo e Direcionado",
          description:
            "Busca proativa em redes especializadas, comunidades técnicas e base proprietária de profissionais pré-qualificados. Shortlist de candidatos aderentes em até 5 dias úteis para a maioria das posições.",
        },
        {
          icon: <ShieldCheck className="h-6 w-6" />,
          title: "Avaliação Técnica Rigorosa",
          description:
            "Processo em múltiplas camadas: análise de portfólio, entrevista técnica conduzida por especialistas, testes práticos e avaliação comportamental. Critérios padronizados e comparação objetiva entre candidatos.",
        },
        {
          icon: <Users className="h-6 w-6" />,
          title: "Cobertura Completa de TI",
          description:
            "Desenvolvimento, engenharia de dados, cloud, segurança, IA, BI, DevOps, arquitetura de soluções e liderança técnica (CTOs, VPs de Engenharia, Tech Leads). CLT, PJ e alocação temporária.",
        },
        {
          icon: <BarChart3 className="h-6 w-6" />,
          title: "Transparência e Métricas",
          description:
            "Portal exclusivo para acompanhamento em tempo real: status de cada etapa, feedbacks, time-to-fill, taxa de aceite de ofertas e NPS do candidato. Dados que orientam decisões e melhoria contínua.",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: "Garantia de Resultado",
          description:
            "Período de garantia em todas as contratações efetivas. Se o profissional não se adaptar durante o período contratual, realizamos a reposição sem custo adicional. Compromisso com o sucesso da contratação.",
        },
      ]}
      steps={[
        {
          number: "1",
          title: "Diagnóstico e Briefing",
          description:
            "Mapeamos cultura, momento do time, stack tecnológico, desafios do projeto e perfil ideal. Esse alinhamento garante uma busca direcionada e assertiva.",
        },
        {
          number: "2",
          title: "Hunting Ativo com IA",
          description:
            "Buscamos ativamente em nossa base de profissionais e redes especializadas. A IA analisa dezenas de variáveis para priorizar os candidatos com maior probabilidade de sucesso.",
        },
        {
          number: "3",
          title: "Avaliação e Shortlist",
          description:
            "Entrevistas técnicas, testes práticos e avaliação comportamental. Apresentamos uma shortlist qualificada com scoring detalhado e parecer técnico de cada candidato.",
        },
        {
          number: "4",
          title: "Contratação e Acompanhamento",
          description:
            "Apoiamos na negociação, onboarding e acompanhamento pós-contratação. Monitoramos a adaptação e satisfação para garantir retenção e performance.",
        },
      ]}
      finalCtaTitle="Contrate Melhor. Contrate com Inteligência."
      finalCtaDescription="Reduza o tempo de contratação, aumente a assertividade e garanta profissionais que realmente impactam seus resultados. Fale com nossos especialistas em hunting de TI."
      finalCtaText="Solicitar Proposta"
      finalCtaHref="/contato"
      accentColor="orange"
    />
    <HuntingFAQ />
  </div>
);

export default HuntingInfoPage;
