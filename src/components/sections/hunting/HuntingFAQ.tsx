import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const accentOrange = "#F97316";
const accentDark = "#1A2B3C";

const faqItems = [
  {
    question: "Como a FinanceIT utiliza inteligência artificial no processo de recrutamento e seleção?",
    answer: "A FinanceIT aplica IA em etapas-chave do recrutamento: triagem inteligente de currículos, análise de compatibilidade entre perfis e requisitos técnicos, e scoring automatizado de candidatos. Isso acelera a identificação dos profissionais mais aderentes à vaga, reduzindo o tempo de contratação sem comprometer a qualidade da avaliação."
  },
  {
    question: "Qual é o diferencial da FinanceIT em relação a outras consultorias de recrutamento de TI?",
    answer: "A FinanceIT combina profundo conhecimento do mercado de tecnologia com metodologias estruturadas de avaliação técnica e comportamental. Nossa equipe entende as nuances de cada stack tecnológica e consegue avaliar não apenas competências técnicas, mas também fit cultural e potencial de crescimento dentro da organização do cliente."
  },
  {
    question: "Em quanto tempo a FinanceIT consegue apresentar candidatos qualificados?",
    answer: "Graças à nossa base ativa de profissionais pré-qualificados e ao uso de IA para triagem, conseguimos apresentar uma shortlist de candidatos aderentes em até 5 dias úteis para a maioria das posições. Vagas de alta especialização podem demandar um prazo maior, sempre comunicado de forma transparente."
  },
  {
    question: "A FinanceIT recruta para quais áreas de tecnologia?",
    answer: "Atuamos em todas as disciplinas de TI: desenvolvimento de software, engenharia de dados, cloud e infraestrutura, segurança da informação, inteligência artificial, business intelligence, gestão de projetos e produtos digitais, DevOps, arquitetura de soluções e liderança técnica (CTOs, VPs de Engenharia, Tech Leads)."
  },
  {
    question: "Como funciona o processo de avaliação técnica dos candidatos?",
    answer: "Aplicamos uma avaliação em múltiplas camadas: análise de experiência e portfólio, entrevista técnica conduzida por especialistas da área, testes práticos quando aplicável e avaliação de soft skills. A IA auxilia na padronização dos critérios e na comparação objetiva entre candidatos."
  },
  {
    question: "A FinanceIT trabalha com contratações CLT, PJ e temporárias?",
    answer: "Sim. Trabalhamos com todos os modelos de contratação — CLT, PJ, cooperado e alocação temporária — adaptando nossa abordagem às necessidades e políticas de cada cliente. Orientamos sobre as melhores práticas para cada modelo, considerando legislação, mercado e retenção."
  },
  {
    question: "Como a IA ajuda a reduzir vieses no processo seletivo?",
    answer: "Nossa abordagem com IA prioriza critérios objetivos e mensuráveis na avaliação de candidatos, minimizando vieses inconscientes que podem influenciar decisões humanas. Os algoritmos são calibrados para focar em competências, experiência e potencial, promovendo processos mais diversos e inclusivos."
  },
  {
    question: "Qual é a taxa de retenção dos profissionais recrutados pela FinanceIT?",
    answer: "Nossa taxa de retenção após 12 meses supera 85%, resultado direto da nossa metodologia que avalia não apenas competências técnicas, mas também alinhamento cultural, expectativas de carreira e adequação ao momento da empresa contratante. Profissionais bem posicionados permanecem mais tempo e entregam mais valor."
  },
  {
    question: "A FinanceIT oferece garantia sobre as contratações realizadas?",
    answer: "Sim. Oferecemos período de garantia para todas as contratações efetivas. Caso o profissional não se adapte ou deixe a empresa durante o período de garantia, realizamos a reposição sem custo adicional. Os termos específicos são definidos em contrato conforme o nível e tipo de posição."
  },
  {
    question: "Como a FinanceIT entende as necessidades específicas da minha empresa?",
    answer: "Iniciamos cada projeto com um diagnóstico detalhado: entendemos a cultura da empresa, o momento do time, as tecnologias utilizadas, os desafios do projeto e o perfil ideal do profissional. Esse mapeamento permite uma busca direcionada e assertiva, evitando apresentação de candidatos genéricos."
  },
  {
    question: "É possível acompanhar o andamento do processo seletivo em tempo real?",
    answer: "Sim. Nossos clientes têm acesso a um portal exclusivo onde podem acompanhar todas as etapas do processo seletivo: candidatos em avaliação, status de cada etapa, feedbacks e métricas de desempenho do hunting. A transparência é um pilar da nossa operação."
  },
  {
    question: "A FinanceIT recruta profissionais para trabalho remoto, híbrido e presencial?",
    answer: "Trabalhamos com todos os modelos de trabalho. Nossa base de candidatos inclui profissionais disponíveis para atuação remota, híbrida e presencial em todo o Brasil. Também recrutamos para posições internacionais quando o cliente opera com times globais."
  },
  {
    question: "Como a IA melhora a qualidade do matching entre candidato e vaga?",
    answer: "A IA analisa dezenas de variáveis simultaneamente — stack técnico, senioridade, setor de atuação, tipo de projeto, cultura organizacional e expectativas salariais — para calcular um score de compatibilidade. Isso elimina candidatos com baixa aderência logo na triagem e prioriza os que têm maior probabilidade de sucesso na posição."
  },
  {
    question: "Qual o investimento para contratar o serviço de hunting da FinanceIT?",
    answer: "O investimento varia conforme o nível de senioridade, complexidade técnica e urgência da posição. Trabalhamos com modelos de fee fixo e success fee, sempre com transparência total. Entre em contato para receber uma proposta personalizada baseada nas suas necessidades específicas."
  },
  {
    question: "A FinanceIT recruta para posições de liderança e C-level em tecnologia?",
    answer: "Sim. Temos uma vertical especializada em executive search para posições de liderança tecnológica: CTOs, VPs de Engenharia, Diretores de Tecnologia, Head de Dados, CISO e outros cargos estratégicos. O processo para essas posições é conduzido por consultores sêniores com vivência executiva."
  },
  {
    question: "Como a FinanceIT garante a confidencialidade do processo seletivo?",
    answer: "Todos os processos são conduzidos com total sigilo. Informações sobre a empresa contratante só são compartilhadas com candidatos após aprovação prévia. Para posições sensíveis, oferecemos hunting confidencial onde a identidade da empresa é preservada até as etapas finais do processo."
  },
  {
    question: "A FinanceIT utiliza IA generativa para criar descrições de vagas?",
    answer: "Sim. Utilizamos IA generativa para auxiliar na criação de descrições de vagas mais atrativas, inclusivas e otimizadas para atrair os melhores candidatos. A IA sugere linguagem, estrutura e palavras-chave que aumentam a visibilidade e o engajamento dos profissionais certos com a oportunidade."
  },
  {
    question: "Como funciona a parceria de longo prazo com a FinanceIT?",
    answer: "Clientes com demanda recorrente de contratação podem estabelecer contratos de parceria com condições diferenciadas, SLAs dedicados e um consultor fixo que conhece profundamente a operação. Isso acelera cada novo processo e garante consistência na qualidade dos profissionais apresentados ao longo do tempo."
  },
  {
    question: "A FinanceIT consegue recrutar profissionais com certificações específicas?",
    answer: "Sim. Temos expertise em recrutar profissionais com certificações técnicas específicas — AWS, Azure, GCP, Kubernetes, ITIL, PMP, Scrum, Qlik, Denodo, Avalara, entre outras. Nossa base de candidatos é segmentada por certificações, o que agiliza a busca para posições que exigem qualificações formais."
  },
  {
    question: "Quais métricas a FinanceIT utiliza para medir a eficácia do processo de hunting?",
    answer: "Acompanhamos métricas como time-to-fill (tempo até o preenchimento), taxa de aprovação de shortlist, taxa de aceite de ofertas, retenção pós-contratação, satisfação do gestor contratante e NPS do candidato. Essas métricas são compartilhadas com o cliente para melhoria contínua do processo."
  },
];

const HuntingFAQ = () => {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: accentOrange }}>
            <span className="h-px w-6" style={{ backgroundColor: accentOrange }} />
            Perguntas Frequentes
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Tire suas dúvidas sobre{" "}
            <span style={{ color: accentOrange }}>recrutamento e seleção com IA</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg max-w-2xl mx-auto">
            Respostas para as perguntas mais comuns sobre como a FinanceIT aplica as melhores práticas de hunting de profissionais de TI, com apoio de inteligência artificial.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-border bg-card px-6 transition-all hover:shadow-sm data-[state=open]:shadow-md"
              style={{ borderLeft: `3px solid ${accentOrange}` }}
            >
              <AccordionTrigger className="text-left text-sm font-semibold text-card-foreground hover:no-underline md:text-base [&[data-state=open]]:text-[#F97316]">
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 flex-shrink-0" style={{ color: accentOrange }} />
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

export default HuntingFAQ;
