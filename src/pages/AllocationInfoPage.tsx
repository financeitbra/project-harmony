import { Eye, Gauge, CalendarCheck, ShieldCheck, TrendingUp, HeartHandshake, Target, Brain, Clock, UserCheck } from "lucide-react";
import InfoPageLayout from "@/components/services/InfoPageLayout";
import AlocacaoFAQ from "@/components/sections/alocacao/AlocacaoFAQ";

const AllocationInfoPage = () => (
  <div>
    <InfoPageLayout
      title="Alocação de Profissionais de TI"
      subtitle="Escale seu time de tecnologia com profissionais qualificados, acompanhamento próximo e foco no desenvolvimento humano — sem a complexidade da contratação direta."
      heroDescription="A escassez global de talentos em tecnologia é uma realidade: segundo a Korn Ferry, até 2030 haverá um déficit de 85 milhões de profissionais qualificados no mundo. No Brasil, a Brasscom projeta uma demanda anual de 159 mil profissionais de TI, com formação de apenas 53 mil. Esse gap estrutural impacta diretamente a capacidade de inovação das empresas — 76% dos CIOs relatam que a falta de talentos é a principal barreira para adoção de novas tecnologias (Gartner, 2024). A FinanceIT resolve essa equação com um modelo de alocação que vai além da terceirização tradicional. Integramos profissionais de alto desempenho ao seu time com gestão contínua de performance, plano de desenvolvimento individual (PDI), avaliações periódicas de competências técnicas e comportamentais, e acompanhamento humano dedicado por gestores especializados. Nosso modelo reduz o time-to-productivity em até 40%, mantém taxas de retenção acima de 90% e garante NPS médio de 87 entre os profissionais alocados — indicadores que refletem um ecossistema onde empresas crescem e pessoas se desenvolvem simultaneamente."
      ctaText="Fale com um Especialista"
      ctaHref="/contato"
      benefits={[
        {
          icon: <Eye className="h-6 w-6" />,
          title: "Visibilidade Total em Tempo Real",
          description:
            "Dashboards de alocação com métricas de dedicação, utilização e disponibilidade por projeto, cliente e profissional. Segundo o PMI, organizações com visibilidade sobre recursos têm 28% mais chances de entregar projetos no prazo. Acompanhe indicadores como taxa de ocupação, horas produtivas e distribuição de senioridade em tempo real.",
        },
        {
          icon: <Gauge className="h-6 w-6" />,
          title: "Controle Granular de Dedicação",
          description:
            "Defina e ajuste o percentual de dedicação de cada profissional por projeto — 50%, 80%, 100% — com flexibilidade para realocar conforme a demanda evolui, sem burocracia ou renegociações complexas. Ideal para empresas que operam com múltiplos projetos simultâneos e precisam otimizar a alocação de recursos estratégicos.",
        },
        {
          icon: <CalendarCheck className="h-6 w-6" />,
          title: "Gestão Inteligente de Capacidade",
          description:
            "Identifique profissionais disponíveis, preveja gargalos de capacidade e planeje alocações futuras com antecedência. Empresas que gerenciam capacidade proativamente reduzem ociosidade em até 35% (Gartner). Nossa plataforma sinaliza automaticamente riscos de sobrecarga e sugere redistribuições otimizadas.",
        },
        {
          icon: <ShieldCheck className="h-6 w-6" />,
          title: "Redução de Riscos Trabalhistas",
          description:
            "A FinanceIT assume integralmente a gestão contratual (CLT ou PJ), compliance trabalhista, administração de benefícios e obrigações fiscais. Empresas que utilizam modelos de alocação gerenciada reduzem em até 60% os custos com passivos trabalhistas (Deloitte). Sua empresa foca no core business enquanto garantimos a conformidade jurídica.",
        },
        {
          icon: <HeartHandshake className="h-6 w-6" />,
          title: "Foco no Desenvolvimento Humano",
          description:
            "Cada profissional alocado tem acesso a trilhas de capacitação personalizadas, mentoria técnica, feedbacks estruturados (1:1 quinzenais) e plano de carreira com metas claras. Empresas com forte cultura de desenvolvimento têm 41% menos absenteísmo e 17% mais produtividade (Gallup). Profissionais valorizados entregam resultados excepcionais.",
        },
        {
          icon: <TrendingUp className="h-6 w-6" />,
          title: "Escalabilidade sob Demanda",
          description:
            "Escale seu time para cima ou para baixo conforme o projeto exige — sem os custos fixos, prazos de contratação de 45-90 dias e riscos de desligamento. O modelo flexível da FinanceIT permite mobilizar novos profissionais qualificados em até 10 dias úteis, acompanhando o ritmo acelerado do seu negócio.",
        },
        {
          icon: <Target className="h-6 w-6" />,
          title: "Matching Técnico e Cultural por IA",
          description:
            "Utilizamos algoritmos de inteligência artificial que cruzam mais de 40 variáveis — stack tecnológica, senioridade, perfil comportamental, cultura organizacional e histórico de projetos — para garantir o match ideal entre profissional e cliente. Isso eleva a taxa de sucesso na alocação para acima de 95% já na primeira indicação.",
        },
        {
          icon: <Brain className="h-6 w-6" />,
          title: "Gestão de Performance Contínua",
          description:
            "Monitoramos indicadores de desempenho técnico (velocity, code quality, entrega de sprints) e comportamental (colaboração, comunicação, proatividade) com avaliações 360° trimestrais. Gestores dedicados da FinanceIT atuam como ponte entre o profissional e o cliente, antecipando problemas e promovendo evolução constante.",
        },
        {
          icon: <Clock className="h-6 w-6" />,
          title: "Time-to-Productivity Reduzido",
          description:
            "Nosso processo estruturado de onboarding — que inclui imersão técnica, alinhamento cultural, shadowing e definição de metas de 30-60-90 dias — reduz o tempo de ramp-up de novos profissionais em até 40% comparado à contratação direta. Profissionais produzem valor desde a primeira semana.",
        },
      ]}
      steps={[
        {
          number: "1",
          title: "Diagnóstico e Mapeamento Estratégico",
          description:
            "Entendemos a cultura da empresa, stack tecnológica, metodologia ágil do time, dinâmica de projeto e o perfil ideal do profissional — técnico e comportamental — para garantir aderência completa. Realizamos reuniões com tech leads e gestores para mapear necessidades reais.",
        },
        {
          number: "2",
          title: "Seleção com Avaliação Técnica Rigorosa",
          description:
            "Cada candidato passa por avaliação técnica especializada (live coding, system design ou case técnico), análise comportamental com assessment validado, checagem de referências e validação de fit cultural antes de ser apresentado ao cliente.",
        },
        {
          number: "3",
          title: "Onboarding Estruturado e Integração",
          description:
            "O profissional é integrado ao time com onboarding de 5 dias: alinhamento técnico com a stack do projeto, imersão na cultura e processos da empresa, definição de metas 30-60-90 dias, apresentação ao time e acompanhamento intensivo nas primeiras semanas.",
        },
        {
          number: "4",
          title: "Acompanhamento Contínuo e Evolução",
          description:
            "Gestor dedicado da FinanceIT realiza check-ins semanais no primeiro mês e quinzenais a partir do segundo, avaliações de desempenho trimestrais, feedback 360° e revisão de plano de desenvolvimento individual (PDI) — garantindo evolução e satisfação de todas as partes.",
        },
      ]}
      finalCtaTitle="Construa um Time de TI de Alta Performance"
      finalCtaDescription="Reduza o time-to-productivity em até 40%, elimine riscos trabalhistas, mantenha retenção acima de 90% e tenha profissionais engajados, acompanhados e em constante evolução. Converse com nossos especialistas e descubra como a alocação estratégica da FinanceIT transforma a capacidade tecnológica da sua empresa — com foco em resultados e no desenvolvimento humano."
      finalCtaText="Agendar Conversa"
      finalCtaHref="/contato"
      accentColor="blue"
    />
    <AlocacaoFAQ />
  </div>
);

export default AllocationInfoPage;
