import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const accentBlue = "#0EA5E9";

const faqItems = [
  {
    question: "O que é o serviço de alocação de profissionais de TI da FinanceIT?",
    answer: "É um modelo de contratação onde a FinanceIT disponibiliza profissionais de tecnologia qualificados para atuar diretamente nos projetos do cliente, com acompanhamento contínuo, gestão de performance e foco no desenvolvimento humano. Diferente de uma simples terceirização, nosso modelo prioriza integração real do profissional ao time do cliente."
  },
  {
    question: "Qual a diferença entre alocação de profissionais e terceirização tradicional?",
    answer: "Na terceirização tradicional, o foco está na entrega de tarefas com pouco envolvimento humano. Na alocação da FinanceIT, o profissional é integrado ao time do cliente, recebe acompanhamento próximo de um gestor dedicado, tem plano de desenvolvimento individual e acesso a treinamentos. O resultado é maior engajamento, menor rotatividade e entregas de maior qualidade."
  },
  {
    question: "Como a FinanceIT acompanha os profissionais alocados?",
    answer: "Cada profissional alocado conta com um gestor da FinanceIT que realiza check-ins periódicos, avaliações de desempenho, feedbacks estruturados e acompanhamento de carreira. Também monitoramos indicadores como satisfação do cliente, aderência técnica e evolução profissional para garantir uma experiência positiva para todas as partes."
  },
  {
    question: "A FinanceIT se preocupa com o desenvolvimento pessoal e profissional dos alocados?",
    answer: "Sim, essa é uma das nossas prioridades. Acreditamos que profissionais valorizados entregam mais. Oferecemos acesso a trilhas de capacitação, certificações técnicas, mentoria e acompanhamento de carreira. O desenvolvimento do ser humano está no centro da nossa proposta de valor."
  },
  {
    question: "Quais perfis de profissionais de TI a FinanceIT aloca?",
    answer: "Alocamos profissionais em todas as disciplinas de tecnologia: desenvolvedores front-end, back-end e full-stack, engenheiros de dados, analistas de BI, especialistas em cloud, DevOps, segurança da informação, arquitetos de soluções, Scrum Masters, Product Owners, QA engineers e líderes técnicos."
  },
  {
    question: "Como a FinanceIT garante a qualidade dos profissionais alocados?",
    answer: "Todos os profissionais passam por um processo rigoroso de avaliação técnica e comportamental antes da alocação. Utilizamos entrevistas técnicas especializadas, testes práticos, avaliação de soft skills e análise de fit cultural com o cliente. Após a alocação, o acompanhamento contínuo garante que a qualidade se mantenha ao longo do tempo."
  },
  {
    question: "É possível substituir um profissional alocado que não atenda às expectativas?",
    answer: "Sim. Caso um profissional não se adapte ao projeto ou não atenda às expectativas técnicas, a FinanceIT realiza a substituição de forma ágil. Nosso objetivo é garantir que o cliente sempre tenha o profissional certo na posição certa, sem impacto relevante no cronograma do projeto."
  },
  {
    question: "A FinanceIT oferece flexibilidade de escala no time alocado?",
    answer: "Sim. Nosso modelo permite escalar o time para cima ou para baixo conforme a demanda do projeto evolui. Isso dá ao cliente agilidade para responder a mudanças de escopo, prazos ou prioridades sem os custos fixos e a burocracia de contratações e desligamentos diretos."
  },
  {
    question: "Como funciona a gestão de dedicação dos profissionais alocados?",
    answer: "Cada profissional tem seu percentual de dedicação definido por projeto ou cliente. A FinanceIT oferece ferramentas de visibilidade em tempo real que permitem ao gestor acompanhar a alocação, identificar disponibilidade e otimizar a utilização dos recursos de forma estratégica."
  },
  {
    question: "A FinanceIT trabalha com alocação remota, híbrida e presencial?",
    answer: "Sim. Alocamos profissionais em todos os modelos de trabalho — remoto, híbrido e presencial — em todo o Brasil. A definição do modelo é feita em conjunto com o cliente, considerando a natureza do projeto, a cultura da empresa e as preferências do profissional."
  },
  {
    question: "Qual o prazo mínimo de alocação de um profissional?",
    answer: "Trabalhamos com contratos flexíveis, mas o prazo mínimo recomendado é de 3 meses para garantir que o profissional se integre adequadamente ao time e ao projeto. Para demandas de curto prazo, avaliamos caso a caso para encontrar a melhor solução."
  },
  {
    question: "Como a FinanceIT lida com a retenção dos profissionais alocados?",
    answer: "A retenção é resultado direto do nosso modelo de cuidado com o profissional. Oferecemos remuneração competitiva, benefícios diferenciados, plano de carreira, acompanhamento contínuo e um ambiente de valorização. Isso resulta em uma taxa de retenção significativamente acima da média do mercado."
  },
  {
    question: "O profissional alocado pela FinanceIT segue as políticas e processos do meu time?",
    answer: "Sim. O profissional alocado se integra completamente ao time do cliente, seguindo suas metodologias, ferramentas, processos e cultura. A FinanceIT atua nos bastidores, garantindo suporte, desenvolvimento e acompanhamento sem interferir na operação do dia a dia do cliente."
  },
  {
    question: "A FinanceIT oferece dashboards para acompanhar a alocação?",
    answer: "Sim. Nossos clientes têm acesso a dashboards com visibilidade total sobre os profissionais alocados: dedicação por projeto, horas trabalhadas, avaliações de desempenho e indicadores de produtividade. Essa transparência facilita a tomada de decisões e o planejamento de capacidade."
  },
  {
    question: "Como a FinanceIT integra a alocação de profissionais com as demais soluções do portfólio?",
    answer: "A alocação de profissionais se conecta nativamente com nossas outras soluções — hunting, gestão de vagas, controle de horas e avaliação de desempenho. Isso permite uma gestão integrada do ciclo de vida do profissional, desde a atração até a evolução de carreira dentro do projeto do cliente."
  },
  {
    question: "A FinanceIT utiliza IA para otimizar a alocação de profissionais?",
    answer: "Sim. Utilizamos inteligência artificial para analisar o perfil do profissional, os requisitos do projeto e o histórico de performance para recomendar a melhor combinação. A IA também auxilia na identificação de gaps de competência e na sugestão de treinamentos para evolução contínua."
  },
  {
    question: "Quais são os custos envolvidos na alocação de profissionais pela FinanceIT?",
    answer: "O investimento varia conforme o perfil técnico, senioridade e modelo de alocação. Trabalhamos com transparência total em nossa precificação, sem custos ocultos. Entre em contato para receber uma proposta personalizada que considere suas necessidades específicas de equipe e projeto."
  },
  {
    question: "A FinanceIT realiza onboarding dos profissionais alocados?",
    answer: "Sim. Antes de iniciar no projeto, cada profissional passa por um processo de onboarding que inclui alinhamento técnico, imersão na cultura do cliente, apresentação ao time e definição clara de expectativas e metas. Isso acelera a produtividade e facilita a integração."
  },
];

const AlocacaoFAQ = () => {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: accentBlue }}>
            <span className="h-px w-6" style={{ backgroundColor: accentBlue }} />
            Perguntas Frequentes
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Tire suas dúvidas sobre{" "}
            <span style={{ color: accentBlue }}>alocação de profissionais de TI</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg max-w-2xl mx-auto">
            Respostas para as perguntas mais comuns sobre como a FinanceIT aloca, acompanha e desenvolve profissionais de tecnologia integrados ao seu time.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-border bg-card px-6 transition-all hover:shadow-sm data-[state=open]:shadow-md"
              style={{ borderLeft: `3px solid ${accentBlue}` }}
            >
              <AccordionTrigger className="text-left text-sm font-semibold text-card-foreground hover:no-underline md:text-base [&[data-state=open]]:text-[#0EA5E9]">
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 flex-shrink-0" style={{ color: accentBlue }} />
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base pl-7">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default AlocacaoFAQ;
