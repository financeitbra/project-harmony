import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const denodoRed = "#E03127";
const denodoDark = "#2D2D2D";

const faqItems = [
  {
    question: "O que é virtualização de dados e como ela difere de ETL tradicional?",
    answer: "A virtualização de dados cria uma camada lógica que conecta fontes heterogêneas sem mover ou copiar dados fisicamente. Diferente do ETL tradicional, que extrai, transforma e carrega dados em um repositório central, a virtualização acessa os dados em tempo real nas fontes originais, reduzindo latência, custos de armazenamento e complexidade de manutenção."
  },
  {
    question: "Como a Denodo Platform garante performance em consultas distribuídas?",
    answer: "A Denodo utiliza técnicas avançadas de otimização como query push-down (delega processamento às fontes), cache inteligente multinível, paralelização de consultas e otimizador de queries baseado em custos. Isso permite que consultas em múltiplas fontes tenham performance comparável a acessos diretos."
  },
  {
    question: "Quais tipos de fontes de dados a Denodo pode integrar?",
    answer: "A Denodo conecta virtualmente qualquer fonte: bancos relacionais (Oracle, SQL Server, PostgreSQL), data lakes (S3, ADLS), APIs REST/SOAP, arquivos (CSV, JSON, XML, Parquet), SaaS (Salesforce, SAP), NoSQL (MongoDB, Cassandra), mainframes e plataformas de streaming como Kafka — tudo através de uma interface unificada."
  },
  {
    question: "A virtualização de dados substitui o data warehouse?",
    answer: "Não necessariamente. A virtualização complementa o data warehouse, criando uma camada de abstração que pode incluí-lo como uma das fontes. Muitas empresas usam a Denodo para reduzir a necessidade de novos data marts, acelerar acessos que não precisam de persistência e unificar a visão sobre dados que estão dentro e fora do warehouse."
  },
  {
    question: "Como a Denodo suporta arquiteturas de Data Fabric e Data Mesh?",
    answer: "A Denodo é considerada uma peça central para Data Fabric, fornecendo a camada de integração lógica que conecta dados de toda a organização. Para Data Mesh, permite que domínios publiquem dados como produtos através de views virtuais, com governança federada, catálogo integrado e controle de acesso granular por domínio."
  },
  {
    question: "Qual o impacto na governança e conformidade regulatória?",
    answer: "A virtualização centraliza as políticas de segurança e acesso em uma única camada. Isso significa controle granular por usuário, row-level security, mascaramento dinâmico de dados sensíveis, linhagem completa de dados e auditoria de acessos — facilitando conformidade com LGPD, GDPR e outras regulamentações."
  },
  {
    question: "Quanto tempo leva para implementar a virtualização de dados?",
    answer: "Projetos iniciais com a Denodo podem gerar valor em 4 a 8 semanas, começando com casos de uso prioritários. A abordagem iterativa permite expandir gradualmente, adicionando novas fontes e views conforme a demanda. A curva de aprendizado é acelerada por uma interface visual intuitiva e ampla documentação."
  },
  {
    question: "Como a virtualização de dados reduz custos operacionais?",
    answer: "Ao eliminar a necessidade de replicar dados entre sistemas, reduz custos de armazenamento, licenciamento e manutenção de pipelines. Estudos da Forrester mostram ROI de até 400% em 3 anos, com redução de até 65% no tempo de integração de novas fontes e menor dependência de equipes especializadas em ETL."
  },
  {
    question: "A Denodo tem recursos de IA e machine learning integrados?",
    answer: "Sim. A Denodo incorpora IA para otimização automática de queries, recomendação de dados via catálogo inteligente, detecção de padrões de uso e sugestões de modelagem. Além disso, facilita o acesso de plataformas de ML a dados integrados sem necessidade de pipelines dedicados de preparação."
  },
  {
    question: "Como funciona o self-service de dados com a Denodo?",
    answer: "A Denodo oferece um catálogo de dados com busca semântica, onde usuários de negócio encontram e acessam dados sem precisar de conhecimento técnico. Views virtuais com nomes de negócio, descrições e tags permitem que analistas criem consultas, dashboards e relatórios com autonomia, reduzindo filas de solicitação para TI."
  },
  {
    question: "É possível usar a Denodo em ambientes híbridos e multi-cloud?",
    answer: "Sim, a Denodo é projetada para ambientes híbridos. Pode ser implantada on-premises, em qualquer cloud pública (AWS, Azure, GCP) ou em configuração híbrida, conectando fontes em diferentes ambientes de forma transparente. Isso é essencial para empresas em processo de migração para cloud ou com estratégia multi-cloud."
  },
  {
    question: "Qual o papel da Financeit na implementação da Denodo?",
    answer: "A Financeit atua como parceira estratégica, combinando expertise em dados com conhecimento profundo da plataforma Denodo. Realizamos o diagnóstico de fontes, desenho da arquitetura de virtualização, implementação técnica, integração com ferramentas de BI e analytics, e suporte contínuo para evolução da malha de dados."
  },
];

const DenodoFAQ = () => {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: denodoRed }}>
            <span className="h-px w-6" style={{ backgroundColor: denodoRed }} />
            Perguntas Frequentes
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            Tire suas dúvidas sobre{" "}
            <span style={{ color: denodoRed }}>virtualização de dados</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg max-w-2xl mx-auto">
            Respostas para as perguntas mais comuns sobre a plataforma Denodo e como a virtualização de dados transforma a gestão de informações.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-border bg-card px-6 transition-all hover:shadow-sm data-[state=open]:shadow-md"
              style={{ borderLeft: `3px solid ${denodoRed}` }}
            >
              <AccordionTrigger className="text-left text-sm font-semibold text-card-foreground hover:no-underline md:text-base [&[data-state=open]]:text-[#E03127]">
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 flex-shrink-0" style={{ color: denodoRed }} />
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

export default DenodoFAQ;
