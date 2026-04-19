import { useState } from "react";
import { ChevronDown, Cloud, Database } from "lucide-react";

const qlikGreen = "#009845";
const qlikNavy = "#1A2456";

interface FAQItem {
  q: string;
  a: string;
}

const cloudAnalyticsFAQs: FAQItem[] = [
  { q: "O que é o Qlik Cloud Analytics e como ele se diferencia de ferramentas tradicionais de BI?", a: "O Qlik Cloud Analytics é uma plataforma SaaS de análise de dados que combina um motor associativo exclusivo com inteligência artificial. Diferente de ferramentas baseadas em consultas SQL lineares, o motor associativo da Qlik permite explorar dados livremente, revelando relações ocultas sem caminhos predefinidos — o que acelera a descoberta de insights." },
  { q: "Preciso migrar todos os meus dados para a nuvem para usar o Qlik Cloud Analytics?", a: "Não. O Qlik Cloud Analytics se conecta a centenas de fontes — cloud, on-premise ou híbridas — incluindo SAP, Salesforce, bancos SQL, APIs REST e arquivos. Você pode analisar dados onde eles estiverem, sem necessidade de migração total." },
  { q: "Como o Qlik Sense no Cloud lida com grandes volumes de dados sem perda de performance?", a: "O Qlik Cloud utiliza compressão in-memory altamente otimizada e processamento distribuído. Mesmo com bilhões de linhas, o motor associativo mantém respostas em subsegundos, com cálculos sob demanda que evitam pré-agregações desnecessárias." },
  { q: "Quais são os recursos de IA e machine learning disponíveis no Qlik Cloud Analytics?", a: "O Qlik Cloud oferece Insight Advisor (sugestões automáticas de visualizações e análises por NLP), AutoML para construir modelos preditivos sem código, e alertas inteligentes que notificam sobre anomalias e tendências relevantes automaticamente." },
  { q: "Como funciona a governança e segurança dos dados no Qlik Cloud?", a: "A plataforma oferece controle de acesso granular por seção, objeto e dado. Inclui linhagem de dados completa, criptografia em repouso e em trânsito (AES-256/TLS 1.2+), conformidade SOC 2 Type II, ISO 27001 e GDPR, além de multi-tenancy seguro." },
  { q: "É possível criar dashboards colaborativos com o Qlik Cloud Analytics?", a: "Sim. O Qlik Cloud permite espaços compartilhados com controle de permissões, anotações em gráficos, alertas compartilhados e integração com ferramentas como Microsoft Teams e Slack para distribuição de insights em tempo real." },
  { q: "Qual o modelo de licenciamento do Qlik Cloud Analytics?", a: "O Qlik Cloud oferece licenças por capacidade (baseadas em consumo) e por usuário nomeado. Existem perfis de Analyzer (consumo de dashboards) e Professional (criação e análise avançada), permitindo escalar conforme a maturidade analítica da empresa." },
  { q: "Como o Qlik Cloud Analytics se integra com outras ferramentas do ecossistema corporativo?", a: "O Qlik Cloud possui APIs RESTful completas, conectores nativos para SAP, Salesforce, ServiceNow, Google BigQuery, Snowflake, além de extensões embed para inserir analytics em portais, apps e ERPs existentes via iframe ou SDK JavaScript." },
  { q: "O Qlik Cloud Analytics suporta análises em tempo real?", a: "Sim. Com o Qlik Cloud Data Integration e streaming de dados via Change Data Capture (CDC), é possível alimentar dashboards com dados quase em tempo real, ideal para monitoramento operacional e tomada de decisão ágil." },
  { q: "Como funciona a migração do Qlik Sense on-premise para o Qlik Cloud?", a: "A Qlik oferece ferramentas nativas de migração que transportam apps, conexões, usuários e permissões. A Financeit apoia nesse processo com diagnóstico, planejamento e execução faseada para minimizar riscos e garantir continuidade operacional." },
  { q: "O que é o Qlik Application Automation e como ele ajuda na produtividade?", a: "É um recurso no-code que permite criar fluxos automatizados entre o Qlik Cloud e centenas de SaaS — como enviar alertas no Slack quando um KPI muda, atualizar planilhas no Google Sheets ou acionar workflows no ServiceNow, tudo sem programação." },
  { q: "O Qlik Cloud Analytics é adequado para empresas de médio porte?", a: "Sim. O modelo SaaS elimina a necessidade de infraestrutura própria e equipe de TI dedicada. Empresas de médio porte ganham acesso a analytics de nível enterprise com custos previsíveis e escalabilidade sob demanda." },
];

const talendCloudFAQs: FAQItem[] = [
  { q: "O que é o Qlik Talend Cloud e para que ele serve?", a: "O Qlik Talend Cloud é a plataforma de integração e qualidade de dados da Qlik. Ele permite conectar, transformar, limpar e entregar dados confiáveis de centenas de fontes para destinos analíticos, data lakes e data warehouses — tudo em ambiente cloud-native." },
  { q: "Qual a diferença entre Qlik Talend Cloud e o Qlik Cloud Data Integration?", a: "O Qlik Talend Cloud foca em ETL/ELT complexo, qualidade de dados e governança de pipelines. O Qlik Cloud Data Integration é mais voltado para replicação e streaming via CDC. Juntos, formam uma stack completa de integração de dados." },
  { q: "O Qlik Talend Cloud suporta integração de dados em tempo real?", a: "Sim. O Talend Cloud suporta streaming, CDC (Change Data Capture) e pipelines event-driven, permitindo entregar dados atualizados em tempo real para data warehouses como Snowflake, BigQuery, Databricks e Redshift." },
  { q: "Como o Qlik Talend Cloud garante a qualidade dos dados?", a: "A plataforma oferece profiling automático, regras de validação configuráveis, deduplicação, padronização e enriquecimento de dados. O Trust Score™ fornece uma métrica objetiva de confiabilidade para cada dataset, facilitando decisões baseadas em dados confiáveis." },
  { q: "Quais fontes de dados o Qlik Talend Cloud conecta?", a: "Mais de 900 conectores nativos, incluindo bancos relacionais (Oracle, SQL Server, PostgreSQL), ERPs (SAP, Oracle EBS), CRMs (Salesforce, HubSpot), APIs REST/SOAP, arquivos (CSV, JSON, Parquet), serviços cloud (AWS S3, Azure Blob, GCS) e muito mais." },
  { q: "O Qlik Talend Cloud é adequado para projetos de Data Lakehouse?", a: "Sim. O Talend Cloud se integra nativamente com Snowflake, Databricks, BigQuery e Delta Lake, suportando padrões abertos como Apache Iceberg e Parquet, ideal para arquiteturas modernas de Data Lakehouse e Data Mesh." },
  { q: "Como funciona a governança de pipelines no Qlik Talend Cloud?", a: "A plataforma oferece linhagem de dados end-to-end, catálogo de dados integrado, controle de versão de pipelines, auditoria completa de execuções e políticas de acesso granulares, tudo centralizado em uma interface unificada." },
  { q: "O Qlik Talend Cloud permite criar pipelines sem código?", a: "Sim. O Talend Cloud oferece uma interface visual drag-and-drop para design de pipelines, além de componentes pré-construídos para transformações comuns. Usuários técnicos também podem estender com código Java ou Python quando necessário." },
  { q: "Qual o modelo de precificação do Qlik Talend Cloud?", a: "O Talend Cloud opera com licenciamento por capacidade de processamento (baseado em volume de dados e execuções). Existem planos Standard, Premium e Enterprise, cada um com diferentes níveis de conectores, SLA e suporte." },
  { q: "Como o Qlik Talend Cloud se compara a ferramentas como Fivetran ou dbt?", a: "O Talend Cloud é mais abrangente: combina ingestão, transformação, qualidade e governança em uma única plataforma. Fivetran foca em ingestão ELT e dbt em transformação SQL. O Talend cobre todo o ciclo de vida do dado com governança embarcada." },
  { q: "O Qlik Talend Cloud oferece recursos de IA para integração de dados?", a: "Sim. O Talend Cloud utiliza IA para sugestão automática de mapeamentos, detecção de anomalias em pipelines, recomendações de qualidade de dados e classificação automática de dados sensíveis para conformidade com LGPD/GDPR." },
  { q: "Como a Financeit pode ajudar na implementação do Qlik Talend Cloud?", a: "A Financeit atua como parceira certificada, realizando diagnóstico de maturidade de dados, design de arquitetura de integração, implementação de pipelines, treinamento de equipes e suporte contínuo — conectando a tecnologia à realidade operacional de cada empresa." },
];

const FAQAccordionItem = ({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) => (
  <div className="border-b border-border/50 last:border-b-0">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 py-5 px-1 text-left transition-colors hover:text-foreground/80"
    >
      <span className="text-sm font-medium text-card-foreground md:text-base pr-4">{item.q}</span>
      <ChevronDown
        className="h-4 w-4 flex-shrink-0 transition-transform duration-300"
        style={{ color: qlikGreen, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
      />
    </button>
    <div
      className="overflow-hidden transition-all duration-300"
      style={{ maxHeight: isOpen ? "500px" : "0", opacity: isOpen ? 1 : 0 }}
    >
      <p className="pb-5 px-1 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
    </div>
  </div>
);

const FAQSection = ({ title, icon: Icon, faqs }: { title: string; icon: typeof Cloud; faqs: FAQItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${qlikGreen}15` }}>
          <Icon className="h-5 w-5" style={{ color: qlikGreen }} />
        </div>
        <h3 className="font-display text-lg font-bold text-card-foreground md:text-xl">{title}</h3>
      </div>
      <div>
        {faqs.map((item, i) => (
          <FAQAccordionItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
};

const QlikFAQ = () => (
  <section className="section-padding bg-secondary/30">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-3xl text-center mb-14">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: qlikGreen }}>
          <span className="h-px w-6" style={{ backgroundColor: qlikGreen }} />
          Perguntas Frequentes
        </span>
        <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl lg:text-4xl">
          Tire suas dúvidas sobre{" "}
          <span style={{ color: qlikGreen }}>Qlik Cloud Analytics e Talend Cloud</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Reunimos as perguntas mais comuns de empresas que avaliam as plataformas Qlik para inteligência de dados e integração.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <FAQSection title="Qlik Cloud Analytics" icon={Cloud} faqs={cloudAnalyticsFAQs} />
        <FAQSection title="Qlik Talend Cloud" icon={Database} faqs={talendCloudFAQs} />
      </div>
    </div>
  </section>
);

export default QlikFAQ;
