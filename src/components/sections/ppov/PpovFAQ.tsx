import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const ppovTeal = "#2BBFB3";
const ppovDark = "#1A2B3C";

const faqItems = [
  {
    question: "O que é o PPOV e como ele se posiciona no mercado de gestão financeira?",
    answer: "O PPOV é uma plataforma de gestão de desempenho empresarial que integra planejamento orçamentário, acompanhamento de resultado e análise financeira em um único ambiente. Diferente de soluções genéricas de ERP, o PPOV foi desenhado para oferecer uma visão consolidada e confiável da performance financeira, eliminando a fragmentação de dados e a dependência de planilhas paralelas."
  },
  {
    question: "Quais são os principais problemas que o PPOV resolve nas empresas?",
    answer: "O PPOV resolve a fragmentação de informações financeiras, o retrabalho de consolidação manual, a falta de confiança nos números apresentados à liderança e a lentidão no fechamento e análise de resultados. Empresas que operam com múltiplas bases e versões concorrentes da verdade encontram no PPOV a estrutura necessária para decisões mais rápidas e consistentes."
  },
  {
    question: "Como o PPOV integra orçamento e realizado em uma única base?",
    answer: "O PPOV conecta as premissas orçamentárias com os dados realizados em tempo real, permitindo comparações automáticas entre planejado e executado. A plataforma elimina a necessidade de conciliações manuais entre fontes diferentes, garantindo que orçamento, resultado e projeções estejam sempre alinhados em uma única fonte da verdade."
  },
  {
    question: "O PPOV substitui o ERP da empresa?",
    answer: "Não. O PPOV complementa o ERP ao oferecer uma camada de inteligência financeira que os ERPs tradicionais não entregam nativamente. Enquanto o ERP processa transações operacionais, o PPOV consolida, analisa e apresenta a informação de forma estruturada para apoiar decisões estratégicas de orçamento, resultado e desempenho."
  },
  {
    question: "Quais tipos de empresa se beneficiam mais com o PPOV?",
    answer: "Empresas de médio e grande porte que enfrentam complexidade na gestão financeira — com múltiplas unidades de negócio, centros de custo, projetos ou filiais — são as que mais se beneficiam. Também é indicado para organizações que precisam reduzir dependência de planilhas, acelerar fechamento mensal e melhorar a qualidade da informação para a liderança."
  },
  {
    question: "Como o PPOV ajuda a reduzir o tempo de fechamento mensal?",
    answer: "Ao automatizar a consolidação de dados financeiros e eliminar etapas manuais de reconciliação, o PPOV reduz significativamente o tempo entre o fim do período e a disponibilização dos resultados. A liderança passa a ter acesso mais rápido a números confiáveis, sem depender de ciclos longos de validação e ajuste."
  },
  {
    question: "O PPOV permite simulações e cenários financeiros?",
    answer: "Sim. A plataforma permite criar cenários de projeção com base em premissas ajustáveis, possibilitando que a área financeira avalie o impacto de diferentes decisões antes de executá-las. Isso inclui simulações de receita, custo, investimento e resultado operacional em diferentes horizontes de tempo."
  },
  {
    question: "Como funciona a automação de rotinas financeiras no PPOV?",
    answer: "O PPOV automatiza processos como consolidação de dados de múltiplas fontes, cálculos de variação orçamentária, geração de relatórios gerenciais e alertas de desvio. Isso libera o time financeiro de tarefas repetitivas e permite que dediquem mais tempo à análise e à geração de insights para o negócio."
  },
  {
    question: "O PPOV se integra com outros sistemas da empresa?",
    answer: "Sim. O PPOV possui capacidade de integração com ERPs, sistemas contábeis, bases de dados e outras fontes de informação financeira. A integração pode ser feita via APIs, conectores nativos ou processos de importação, garantindo que a plataforma reflita a realidade operacional da empresa com consistência."
  },
  {
    question: "Qual o papel da Financeit na implementação do PPOV?",
    answer: "A Financeit atua como parceira estratégica, conectando a capacidade tecnológica do PPOV à realidade financeira de cada empresa. Isso inclui diagnóstico do cenário atual, definição de prioridades, configuração da solução, acompanhamento da implantação e suporte na evolução contínua da gestão de orçamento e resultado."
  },
  {
    question: "O PPOV oferece dashboards e relatórios gerenciais?",
    answer: "Sim. A plataforma disponibiliza dashboards interativos e relatórios gerenciais configuráveis que permitem à liderança acompanhar indicadores-chave de desempenho, comparar orçamento versus realizado, identificar desvios e tomar decisões com base em dados atualizados e consolidados."
  },
  {
    question: "Como o PPOV garante a confiabilidade dos dados financeiros?",
    answer: "O PPOV centraliza todas as informações financeiras em uma base única e estruturada, com rastreabilidade completa de origem, transformação e apresentação dos dados. Isso elimina versões concorrentes da verdade e garante que todos os stakeholders acessem a mesma informação, com a mesma precisão."
  },
  {
    question: "O PPOV suporta gestão por centros de custo e unidades de negócio?",
    answer: "Sim. A plataforma permite estruturar a visão financeira por múltiplas dimensões — centros de custo, unidades de negócio, projetos, filiais, departamentos — com consolidação automática e drill-down em qualquer nível de detalhe. Isso dá à liderança visibilidade granular sem perder a visão consolidada."
  },
  {
    question: "Quanto tempo leva para implementar o PPOV?",
    answer: "O tempo de implementação varia conforme a complexidade da operação financeira e o escopo definido. Projetos iniciais podem gerar valor em 8 a 16 semanas, começando pelos processos mais críticos. A abordagem da Financeit é iterativa: priorizar ganhos de curto prazo enquanto se constrói a base para evolução contínua."
  },
  {
    question: "O PPOV ajuda na governança financeira da empresa?",
    answer: "Sim. Ao centralizar dados, padronizar processos e criar trilhas de auditoria, o PPOV fortalece a governança financeira. A plataforma permite definir níveis de acesso, fluxos de aprovação e regras de negócio que garantem conformidade e controle sem comprometer a agilidade operacional."
  },
  {
    question: "Como o PPOV lida com múltiplas moedas e operações internacionais?",
    answer: "O PPOV suporta operações multi-moeda com conversão automática e consolidação de resultados em diferentes bases cambiais. Isso é essencial para empresas com operações internacionais que precisam reportar resultados consolidados com consistência e precisão."
  },
  {
    question: "O PPOV permite controle de versões do orçamento?",
    answer: "Sim. A plataforma mantém histórico completo de versões orçamentárias, permitindo comparar diferentes revisões, entender a evolução das premissas e rastrear as decisões que levaram a cada ajuste. Isso é fundamental para governança e para responder a questionamentos da liderança com transparência."
  },
  {
    question: "Qual a diferença entre usar PPOV e continuar com planilhas?",
    answer: "Planilhas são flexíveis, mas não escalam com segurança. À medida que a complexidade financeira cresce, elas geram riscos de erro, versões conflitantes, falta de rastreabilidade e dependência de pessoas específicas. O PPOV oferece a mesma flexibilidade analítica com a estrutura, automação e governança que planilhas não conseguem entregar."
  },
  {
    question: "O PPOV suporta planejamento de longo prazo e projeções plurianuais?",
    answer: "Sim. Além do ciclo orçamentário anual, o PPOV permite construir projeções de médio e longo prazo com base em premissas macroeconômicas, metas estratégicas e cenários de mercado. Isso dá à liderança uma visão mais ampla para decisões de investimento, expansão e posicionamento."
  },
  {
    question: "Como começar a avaliar se o PPOV faz sentido para minha empresa?",
    answer: "O primeiro passo é conversar com a Financeit para um diagnóstico do cenário atual da gestão financeira. Avaliamos o nível de fragmentação, os principais pontos de dor, a maturidade dos processos e as prioridades do negócio. A partir disso, desenhamos uma proposta de valor clara e um roadmap de implementação alinhado à realidade da empresa."
  },
];

const PpovFAQ = () => {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: ppovTeal }}>
            <span className="h-px w-6" style={{ backgroundColor: ppovTeal }} />
            Perguntas Frequentes
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Tire suas dúvidas sobre{" "}
            <span style={{ color: ppovTeal }}>gestão integrada de orçamento e resultado</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg max-w-2xl mx-auto">
            Respostas para as perguntas mais comuns sobre como o PPOV ajuda empresas a consolidar uma única fonte da verdade financeira, com mais velocidade, confiança e consistência.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-border bg-card px-6 transition-all hover:shadow-sm data-[state=open]:shadow-md"
              style={{ borderLeft: `3px solid ${ppovTeal}` }}
            >
              <AccordionTrigger className="text-left text-sm font-semibold text-card-foreground hover:no-underline md:text-base [&[data-state=open]]:text-[#2BBFB3]">
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 flex-shrink-0" style={{ color: ppovTeal }} />
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

export default PpovFAQ;
