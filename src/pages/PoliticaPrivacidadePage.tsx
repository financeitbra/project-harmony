const PoliticaPrivacidadePage = () => {
  return (
    <div className="container max-w-4xl py-16 md:py-24">
      <h1 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">Política de Privacidade</h1>
      <p className="mt-4 text-sm text-muted-foreground">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

      <div className="prose prose-slate mt-10 max-w-none space-y-6 text-foreground/90">
        <section>
          <h2 className="font-display text-xl font-semibold md:text-2xl">1. Quem somos</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            A Financeit é uma consultoria especializada em inteligência de negócio, dados, governança e IA, sediada em São Paulo, Brasil. Esta política descreve como coletamos, usamos e protegemos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold md:text-2xl">2. Dados que coletamos</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Coletamos dados que você nos fornece diretamente através de formulários (nome, email, telefone, empresa, cargo e mensagem), além de dados de navegação coletados automaticamente via cookies e ferramentas de análise (endereço IP, tipo de navegador, páginas visitadas).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold md:text-2xl">3. Como usamos seus dados</h2>
          <ul className="mt-2 list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
            <li>Responder solicitações de contato e propostas comerciais;</li>
            <li>Enviar comunicações relacionadas aos nossos serviços (com seu consentimento);</li>
            <li>Melhorar a experiência de navegação e o conteúdo do site;</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold md:text-2xl">4. Compartilhamento de dados</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Não vendemos seus dados. Podemos compartilhá-los com prestadores de serviço (hospedagem, email, analytics) estritamente para viabilizar a operação do site, sempre sob obrigação contratual de confidencialidade.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold md:text-2xl">5. Cookies</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para entender como ele é usado. Você pode gerenciar suas preferências através do banner exibido na primeira visita ou nas configurações do seu navegador.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold md:text-2xl">6. Seus direitos (LGPD)</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Você tem direito de: confirmar a existência de tratamento; acessar seus dados; corrigir dados incompletos ou desatualizados; solicitar anonimização ou eliminação; revogar consentimento; e solicitar portabilidade. Para exercer esses direitos, entre em contato conosco pelos canais abaixo.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold md:text-2xl">7. Segurança</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Adotamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados, perda, alteração ou divulgação indevida, incluindo criptografia em trânsito e controle de acesso.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold md:text-2xl">8. Retenção</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Mantemos seus dados pelo tempo necessário para cumprir as finalidades para as quais foram coletados, observando prazos legais aplicáveis.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold md:text-2xl">9. Contato (Encarregado de Dados)</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Para dúvidas, solicitações ou exercício de direitos relacionados aos seus dados pessoais, entre em contato pelo email{" "}
            <a href="mailto:contato@financeit.com.br" className="font-medium text-accent hover:underline">
              contato@financeit.com.br
            </a>{" "}
            ou pelo WhatsApp <strong>+55 11 91469-6503</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold md:text-2xl">10. Alterações</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Esta política pode ser atualizada periodicamente. Recomendamos revisar esta página regularmente para se manter informado sobre como protegemos seus dados.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PoliticaPrivacidadePage;
