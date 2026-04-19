import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const avalaraOrange = "#F57C20";
const avalaraDark = "#1E2A3A";

const faqItems = [
  {
    question: "O que muda na prática para as empresas com a reforma tributária brasileira?",
    answer: "A reforma tributária substitui tributos como PIS, Cofins, ICMS, ISS e IPI por dois novos: o IBS (Imposto sobre Bens e Serviços) e a CBS (Contribuição sobre Bens e Serviços). Isso significa que sistemas, processos, documentos fiscais, parametrizações e rotinas de apuração terão que ser revisados e adaptados. A transição começará em 2026 com período de teste e será implementada gradualmente até 2033."
  },
  {
    question: "Como a Avalara ajuda empresas a se preparar para a reforma tributária?",
    answer: "A Avalara oferece um motor de cálculo tributário em nuvem que pode ser atualizado de forma centralizada conforme as novas regras forem publicadas. Isso permite que empresas adaptem suas operações sem depender de atualizações manuais em múltiplos sistemas, reduzindo risco de erro e acelerando a conformidade com o novo modelo."
  },
  {
    question: "Qual a diferença entre automação fiscal e compliance fiscal?",
    answer: "Automação fiscal envolve a mecanização de rotinas como cálculo de tributos, emissão de documentos e escrituração. Compliance fiscal vai além: é a capacidade de garantir que toda a operação esteja aderente às exigências legais vigentes, incluindo obrigações acessórias, prazos, formatos e regras específicas por jurisdição. A Avalara atua em ambas as frentes."
  },
  {
    question: "A Avalara funciona para empresas de qualquer porte?",
    answer: "Sim. A Avalara atende desde empresas de médio porte até grandes corporações com operações complexas e multi-jurisdicionais. A arquitetura em nuvem permite escalar conforme o volume de transações cresce, sem necessidade de infraestrutura dedicada."
  },
  {
    question: "Quais tipos de documentos fiscais a Avalara pode emitir e gerenciar?",
    answer: "A Avalara suporta a emissão e gestão de NF-e, NFS-e, NFC-e, CT-e, MDF-e e outros documentos fiscais eletrônicos exigidos pela legislação brasileira. Além disso, oferece funcionalidades de captura, validação e armazenamento de documentos recebidos de fornecedores."
  },
  {
    question: "Como funciona o cálculo tributário da Avalara?",
    answer: "O motor de determinação tributária da Avalara analisa cada transação considerando origem, destino, tipo de produto/serviço, regime tributário, benefícios fiscais aplicáveis e regras específicas por estado e município. O cálculo é feito em tempo real via API, com atualizações automáticas quando a legislação muda."
  },
  {
    question: "A Avalara se integra com ERPs e sistemas legados?",
    answer: "Sim. A Avalara possui conectores nativos para os principais ERPs do mercado (SAP, Oracle, Microsoft Dynamics, TOTVS, entre outros) e APIs abertas que permitem integração com sistemas proprietários. A Financeit apoia na estratégia de integração para garantir aderência ao contexto operacional de cada empresa."
  },
  {
    question: "O que é o AvaTax e como ele funciona?",
    answer: "O AvaTax é o motor de cálculo tributário da Avalara. Ele determina automaticamente os tributos aplicáveis a cada transação com base em regras fiscais atualizadas, considerando NCM, CEST, CFOP, alíquotas estaduais e municipais, substituição tributária e outros parâmetros. Funciona via API em nuvem com latência mínima."
  },
  {
    question: "Como a Avalara lida com a complexidade fiscal brasileira?",
    answer: "O Brasil possui mais de 5.500 municípios com regras fiscais distintas, além de 27 legislações estaduais. A Avalara mantém uma base de regras fiscais continuamente atualizada que cobre essa complexidade, incluindo substituição tributária, diferencial de alíquota, benefícios fiscais e regimes especiais."
  },
  {
    question: "Quais os riscos de não se preparar para a reforma tributária?",
    answer: "Empresas que não se prepararem podem enfrentar cálculos incorretos, multas por descumprimento, atrasos em obrigações acessórias, retrabalho operacional massivo, perda de créditos tributários e exposição a autuações. Além disso, a convivência entre o sistema atual e o novo durante a transição multiplica a complexidade."
  },
  {
    question: "A Avalara oferece suporte para obrigações acessórias?",
    answer: "Sim. A Avalara automatiza a geração e transmissão de obrigações acessórias como SPED Fiscal, SPED Contribuições, EFD-Reinf, DCTF e outras exigências federais, estaduais e municipais. Isso reduz o risco de atrasos, inconsistências e retrabalho na área fiscal."
  },
  {
    question: "O que é BPO fiscal e quando faz sentido contratar?",
    answer: "BPO fiscal (Business Process Outsourcing) é a terceirização de processos fiscais para um parceiro especializado. Faz sentido quando a empresa precisa reforçar capacidade operacional sem ampliar equipe interna, ou quando a complexidade da operação exige conhecimento especializado que não está disponível internamente. A Avalara oferece serviços de BPO com tecnologia integrada."
  },
  {
    question: "Como a Avalara garante a atualização das regras fiscais?",
    answer: "A Avalara mantém uma equipe dedicada de pesquisa tributária que monitora continuamente alterações legislativas em todas as esferas (federal, estadual e municipal). As atualizações são aplicadas automaticamente no motor de cálculo em nuvem, sem necessidade de intervenção manual por parte do cliente."
  },
  {
    question: "Qual o papel da Financeit na implementação da Avalara?",
    answer: "A Financeit atua como parceira estratégica, conectando a capacidade tecnológica da Avalara à realidade operacional de cada empresa. Isso inclui diagnóstico do cenário fiscal, definição de prioridades, planejamento de integração, configuração da solução e acompanhamento da evolução da operação fiscal."
  },
  {
    question: "A Avalara ajuda na gestão de créditos tributários?",
    answer: "Sim. Com cálculos precisos e rastreabilidade completa das transações, a Avalara facilita a identificação e aproveitamento correto de créditos tributários, reduzindo o risco de perda de créditos por erro de classificação ou falta de documentação adequada."
  },
  {
    question: "Como a solução em nuvem da Avalara se diferencia de soluções on-premise?",
    answer: "A solução em nuvem elimina a necessidade de servidores dedicados, reduz custos de manutenção e permite atualizações automáticas de regras fiscais. Além disso, oferece maior escalabilidade, disponibilidade e capacidade de integração com ecossistemas modernos de tecnologia."
  },
  {
    question: "A Avalara suporta operações internacionais?",
    answer: "Sim. A Avalara possui presença global e suporta cálculos tributários para operações de importação e exportação, incluindo classificação fiscal internacional, determinação de impostos de importação, e compliance com regras de comércio exterior. Ideal para empresas com cadeia de suprimentos internacional."
  },
  {
    question: "Quanto tempo leva para implementar a Avalara?",
    answer: "O tempo de implementação varia conforme a complexidade da operação e o escopo de integração. Projetos iniciais podem gerar valor em 6 a 12 semanas, começando pelos processos mais críticos. A abordagem da Financeit é iterativa: priorizar os ganhos de curto prazo enquanto se constrói a base para evolução contínua."
  },
  {
    question: "Como a Avalara trata a substituição tributária?",
    answer: "A Avalara identifica automaticamente os produtos sujeitos a substituição tributária com base no NCM, CEST e nos convênios e protocolos vigentes entre estados. O motor calcula a MVA (Margem de Valor Agregado) aplicável e determina o ICMS-ST de forma precisa, considerando as particularidades de cada UF."
  },
  {
    question: "A solução da Avalara gera relatórios e dashboards fiscais?",
    answer: "Sim. A plataforma oferece visibilidade sobre indicadores fiscais como volume de transações, tributos calculados, documentos emitidos, obrigações cumpridas e pendências. Isso permite que gestores fiscais e financeiros tenham mais controle e capacidade de decisão sobre a operação."
  },
  {
    question: "O que é Tax Compliance e por que é estratégico para as empresas?",
    answer: "Tax Compliance é o conjunto de práticas que garantem que uma empresa esteja em total conformidade com as obrigações tributárias vigentes. Vai além do simples pagamento de impostos: envolve apuração correta, entrega de obrigações acessórias no prazo, rastreabilidade de operações e prontidão para fiscalizações. Empresas com Tax Compliance maduro reduzem riscos de autuações, multas e contingências tributárias."
  },
  {
    question: "Como a solução de Tax Compliance da Avalara se diferencia de abordagens tradicionais?",
    answer: "Diferente de planilhas e processos manuais, a Avalara automatiza o ciclo completo de compliance tributário: determinação de tributos em tempo real, emissão de documentos fiscais, escrituração e entrega de obrigações acessórias. A atualização contínua das regras fiscais em nuvem elimina o risco de operar com parâmetros desatualizados, algo comum em soluções on-premise."
  },
  {
    question: "Quais riscos uma empresa corre sem uma solução robusta de Tax Compliance?",
    answer: "Sem uma solução estruturada, empresas ficam expostas a cálculos incorretos de tributos, perda de créditos fiscais, multas por atraso ou erro em obrigações acessórias, e autuações fiscais que podem comprometer significativamente o resultado financeiro. Além disso, a falta de rastreabilidade dificulta defesas em processos administrativos e judiciais."
  },
  {
    question: "A solução de Tax Compliance da Avalara cobre tributos federais, estaduais e municipais?",
    answer: "Sim. A Avalara oferece cobertura completa para tributos nas três esferas: federal (PIS, Cofins, IPI, IRPJ, CSLL), estadual (ICMS, ICMS-ST, DIFAL) e municipal (ISS). O motor de cálculo considera as particularidades de cada jurisdição, incluindo alíquotas, benefícios fiscais, regimes especiais e regras de substituição tributária vigentes."
  },
  {
    question: "Como a Avalara garante a conformidade contínua diante das constantes mudanças na legislação tributária brasileira?",
    answer: "A Avalara mantém uma equipe de pesquisa tributária dedicada que monitora diariamente alterações legislativas em todas as esferas. As atualizações são aplicadas automaticamente na plataforma em nuvem, garantindo que os cálculos e obrigações reflitam sempre a legislação mais recente — sem necessidade de intervenção manual ou paradas no sistema."
  },
];

const AvalaraFAQ = () => {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: avalaraOrange }}>
            <span className="h-px w-6" style={{ backgroundColor: avalaraOrange }} />
            Perguntas Frequentes
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Tire suas dúvidas sobre{" "}
            <span style={{ color: avalaraOrange }}>soluções fiscais e reforma tributária</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg max-w-2xl mx-auto">
            Respostas para as perguntas mais comuns sobre digitalização fiscal, automação tributária e como a Avalara ajuda empresas a se preparar para o novo cenário regulatório brasileiro.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-border bg-card px-6 transition-all hover:shadow-sm data-[state=open]:shadow-md"
              style={{ borderLeft: `3px solid ${avalaraOrange}` }}
            >
              <AccordionTrigger className="text-left text-sm font-semibold text-card-foreground hover:no-underline md:text-base [&[data-state=open]]:text-[#F57C20]">
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 flex-shrink-0" style={{ color: avalaraOrange }} />
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

export default AvalaraFAQ;
