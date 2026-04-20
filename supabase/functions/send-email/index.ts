import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ContactPayload {
  type: "contact";
  nome: string;
  email: string;
  mensagem: string;
  empresa?: string;
  cargo?: string;
  telefone?: string;
}

interface AssessmentPayload {
  type: "assessment";
  email: string;
  resultado: string;
  recomendacoes: string[];
  nome?: string;
}

type Payload = ContactPayload | AssessmentPayload;

const BRAND = {
  name: "Financeit",
  primary: "#0B5FFF",
  primaryDark: "#083B99",
  accent: "#00BFA5",
  dark: "#0F172A",
  text: "#334155",
  muted: "#64748B",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E2E8F0",
  softBlue: "#EFF6FF",
  softTeal: "#ECFEF8",
  headerBg: "#F5F7FA",
  logoUrl: "https://mgmhhltfdiigsvkirgyz.supabase.co/storage/v1/object/public/email-assets/logo-financeit.png",
  site: "https://financeit.com.br",
  contact: "https://financeit.com.br/contato",
};

function escapeHtml(value: string): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function logoBlock(): string {
  return `<img src="${BRAND.logoUrl}" alt="Financeit" width="180" style="display:block;border:0;outline:none;text-decoration:none;height:auto;max-width:180px;" />`;
}

function preheader(text: string): string {
  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;color:transparent;">${escapeHtml(text)}</div>`;
}

function button(label: string, href: string, bg: string = BRAND.primary, color: string = "#FFFFFF"): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" bgcolor="${bg}" style="border-radius:10px;">
          <a href="${href}" style="display:inline-block;padding:14px 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:14px;font-weight:700;color:${color};text-decoration:none;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>`;
}

function infoRow(label: string, value?: string): string {
  if (!value) return "";
  return `
    <tr>
      <td width="150" valign="top" style="padding:12px 0;border-bottom:1px solid ${BRAND.border};font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:${BRAND.muted};font-weight:700;">
        ${escapeHtml(label)}
      </td>
      <td valign="top" style="padding:12px 0;border-bottom:1px solid ${BRAND.border};font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:${BRAND.dark};">
        ${escapeHtml(value)}
      </td>
    </tr>`;
}

function scoreBand(score: number): { label: string; color: string; summary: string } {
  if (score >= 80) {
    return {
      label: "Avançado",
      color: "#16A34A",
      summary: "Sua empresa já possui uma base forte para escalar dados e IA com foco em eficiência e geração de valor.",
    };
  }
  if (score >= 60) {
    return {
      label: "Intermediário",
      color: BRAND.primary,
      summary: "Há bons fundamentos. Com priorização e estrutura, a jornada para capturar valor com IA pode acelerar bastante.",
    };
  }
  if (score >= 40) {
    return {
      label: "Em desenvolvimento",
      color: "#D97706",
      summary: "Existe potencial relevante, mas ainda há lacunas importantes em estrutura, governança e execução.",
    };
  }
  return {
    label: "Inicial",
    color: "#DC2626",
    summary: "O momento ideal é organizar as bases para transformar dados e IA em vantagem competitiva real.",
  };
}

function extractScore(resultado: string): number {
  const match = resultado.match(/(\d{1,3})(?:[.,]\d+)?/);
  if (!match) return 50;
  const score = Number.parseInt(match[1], 10);
  return Math.max(0, Math.min(100, Number.isFinite(score) ? score : 50));
}

function barRow(label: string, value: number, color: string): string {
  const width = Math.max(8, Math.min(100, Math.round(value)));
  return `
    <tr>
      <td style="padding:10px 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:${BRAND.dark};font-weight:700;">
        ${escapeHtml(label)}
      </td>
    </tr>
    <tr>
      <td style="padding:0 0 14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.bg};border-radius:999px;">
          <tr>
            <td width="${width}%" bgcolor="${color}" style="height:10px;border-radius:999px;font-size:0;line-height:0;">&nbsp;</td>
            <td width="${100 - width}%" style="font-size:0;line-height:0;">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function wrapEmail(title: string, intro: string, bodyHtml: string, options: { showCta?: boolean } = {}): string {
  const showCta = options.showCta !== false;
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.bg};">
    ${preheader(intro)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.bg}">
      <tr>
        <td align="center" style="padding:24px 10px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:18px;">
            <tr>
              <td style="padding:22px 28px;background:${BRAND.headerBg};border-top-left-radius:18px;border-top-right-radius:18px;border-bottom:1px solid ${BRAND.border};">
                ${logoBlock()}
              </td>
            </tr>
            <tr>
              <td style="padding:30px 28px 18px;">
                ${bodyHtml}
              </td>
            </tr>
            ${showCta ? `<tr>
              <td style="padding:0 28px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.softBlue};border:1px solid ${BRAND.border};border-radius:14px;">
                  <tr>
                    <td style="padding:22px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:24px;color:${BRAND.dark};font-weight:700;margin-bottom:8px;">
                        A Financeit ajuda sua empresa a transformar dados em resultado.
                      </div>
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:${BRAND.text};margin-bottom:16px;">
                        Estruturamos dados, governança, inteligência de negócio e iniciativas de IA com foco em clareza, execução e retorno para o negócio.
                      </div>
                      ${button("Falar com um especialista", BRAND.contact)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>` : ""}
            <tr>
              <td style="padding:20px 28px;background:${BRAND.dark};border-bottom-left-radius:18px;border-bottom-right-radius:18px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;color:#CBD5E1;">
                  <strong style="color:#FFFFFF;">Financeit</strong> • Dados, IA, governança e performance para negócios.
                </div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;color:#CBD5E1;">
                  <a href="${BRAND.site}" style="color:#CBD5E1;text-decoration:underline;">financeit.com.br</a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildContactHtml(data: ContactPayload): string {
  const body = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${BRAND.primary};font-weight:700;letter-spacing:0.8px;text-transform:uppercase;margin-bottom:10px;">
      Novo contato recebido
    </div>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:34px;color:${BRAND.dark};font-weight:700;margin-bottom:10px;">
      ${escapeHtml(data.nome)} enviou uma nova mensagem
    </div>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:${BRAND.text};margin-bottom:22px;">
      Abaixo estão os dados preenchidos no formulário do site.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
      ${infoRow("Nome", data.nome)}
      ${infoRow("Empresa", data.empresa)}
      ${infoRow("Cargo", data.cargo)}
      ${infoRow("E-mail", data.email)}
      ${infoRow("Telefone", data.telefone)}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:14px;">
      <tr>
        <td style="padding:18px 20px;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:${BRAND.muted};font-weight:700;margin-bottom:8px;">
            Mensagem
          </div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:24px;color:${BRAND.dark};white-space:pre-wrap;">
            ${escapeHtml(data.mensagem).replace(/\n/g, "<br />")}
          </div>
        </td>
      </tr>
    </table>`;

  return wrapEmail(
    `Novo contato — ${data.nome}`,
    `Novo contato recebido de ${data.nome}`,
    body,
    { showCta: false },
  );
}

function buildAssessmentHtml(data: AssessmentPayload): string {
  const score = extractScore(data.resultado);
  const band = scoreBand(score);
  const recommendations = data.recomendacoes?.filter(Boolean) ?? [];

  const dimensions = recommendations.length >= 3
    ? recommendations.slice(0, 5).map((item, index) => ({
        label: item.length > 48 ? `${item.slice(0, 45)}…` : item,
        value: Math.max(20, Math.min(95, score + (index * 4) - 6)),
      }))
    : [
        { label: "Estratégia e contexto", value: Math.max(20, Math.min(95, score + 4)) },
        { label: "Dados e arquitetura", value: Math.max(20, Math.min(95, score - 6)) },
        { label: "Governança e segurança", value: Math.max(20, Math.min(95, score - 2)) },
        { label: "Casos de uso de IA", value: Math.max(20, Math.min(95, score + 3)) },
        { label: "Execução e cultura", value: Math.max(20, Math.min(95, score - 8)) },
      ];

  const recommendationsHtml = recommendations
    .map((item) => `
      <tr>
        <td valign="top" width="26" style="padding:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:${BRAND.primary};font-weight:700;">✓</td>
        <td style="padding:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:${BRAND.text};">
          ${escapeHtml(item)}
        </td>
      </tr>`)
    .join("");

  const body = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${BRAND.primary};font-weight:700;letter-spacing:0.8px;text-transform:uppercase;margin-bottom:10px;">
      Diagnóstico de prontidão para IA
    </div>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:34px;color:${BRAND.dark};font-weight:700;margin-bottom:10px;">
      ${data.nome ? `Olá, ${escapeHtml(data.nome)}!` : "Seu resultado está pronto."}
    </div>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:${BRAND.text};margin-bottom:22px;">
      Preparamos um resumo visual do seu diagnóstico para ajudar na leitura do momento atual da sua empresa e dos próximos passos mais relevantes.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
      <tr>
        <td width="48%" valign="top" style="padding-right:8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.softBlue};border:1px solid ${BRAND.border};border-radius:14px;">
            <tr>
              <td align="center" style="padding:22px 16px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${BRAND.muted};font-weight:700;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:6px;">
                  Pontuação
                </div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:42px;line-height:42px;color:${BRAND.dark};font-weight:700;margin-bottom:6px;">
                  ${score}
                </div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:${BRAND.text};">
                  de 100 pontos
                </div>
              </td>
            </tr>
          </table>
        </td>
        <td width="52%" valign="top" style="padding-left:8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.softTeal};border:1px solid ${BRAND.border};border-radius:14px;">
            <tr>
              <td style="padding:20px 18px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${BRAND.muted};font-weight:700;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:6px;">
                  Nível atual
                </div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:28px;color:${band.color};font-weight:700;margin-bottom:8px;">
                  ${band.label}
                </div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:21px;color:${BRAND.text};">
                  ${escapeHtml(band.summary)}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:14px;margin-bottom:22px;">
      <tr>
        <td style="padding:18px 20px 6px;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:${BRAND.dark};font-weight:700;margin-bottom:10px;">
            Leitura visual das frentes prioritárias
          </div>
          ${dimensions.map((dimension) => barRow(dimension.label, dimension.value, BRAND.primary)).join("")}
        </td>
      </tr>
    </table>

    ${recommendationsHtml ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:14px;margin-bottom:22px;">
        <tr>
          <td style="padding:18px 20px 6px;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:${BRAND.dark};font-weight:700;margin-bottom:12px;">
              Recomendações para avançar
            </div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${recommendationsHtml}
            </table>
          </td>
        </tr>
      </table>` : ""}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.dark};border-radius:14px;">
      <tr>
        <td style="padding:22px;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:26px;color:#FFFFFF;font-weight:700;margin-bottom:8px;">
            Quer transformar esse diagnóstico em plano de ação?
          </div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#CBD5E1;margin-bottom:16px;">
            A Financeit pode apoiar sua empresa na estruturação de dados, governança, BI, squads especializados e iniciativas de IA com foco em resultado de negócio.
          </div>
          ${button("Quero conversar com a Financeit", BRAND.contact, BRAND.accent, "#062E29")}
        </td>
      </tr>
    </table>`;

  return wrapEmail(
    "Seu diagnóstico de prontidão para IA — Financeit",
    `Seu resultado de prontidão para IA chegou: ${band.label}.`,
    body,
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const SMTP_HOST = Deno.env.get("SMTP_HOST");
  const SMTP_PORT = Deno.env.get("SMTP_PORT");
  const SMTP_USER = Deno.env.get("SMTP_USER");
  const SMTP_PASS = Deno.env.get("SMTP_PASS");
  const CONTACT_TO = Deno.env.get("CONTACT_TO");

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error("Missing SMTP env vars", {
      SMTP_HOST: Boolean(SMTP_HOST),
      SMTP_PORT: Boolean(SMTP_PORT),
      SMTP_USER: Boolean(SMTP_USER),
      SMTP_PASS: Boolean(SMTP_PASS),
      CONTACT_TO: Boolean(CONTACT_TO),
    });

    return new Response(
      JSON.stringify({ status: "error", message: "Configuração SMTP ausente." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  let body: Payload;

  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ status: "error", message: "JSON inválido." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const port = Number.parseInt(SMTP_PORT, 10);
  const client = new SMTPClient({
    connection: {
      hostname: SMTP_HOST,
      port,
      tls: port === 465,
      auth: {
        username: SMTP_USER,
        password: SMTP_PASS,
      },
    },
  });

  try {
    let to: string;
    let subject: string;
    let html: string;

    if (body.type === "contact") {
      if (!body.nome || !body.email || !body.mensagem) {
        await client.close();
        return new Response(
          JSON.stringify({ status: "error", message: "Campos obrigatórios: nome, email, mensagem" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      to = CONTACT_TO;
      subject = `Novo contato — ${body.nome}${body.empresa ? ` (${body.empresa})` : ""}`;
      html = buildContactHtml(body);
    } else if (body.type === "assessment") {
      if (!body.email || !body.resultado || !Array.isArray(body.recomendacoes)) {
        await client.close();
        return new Response(
          JSON.stringify({ status: "error", message: "Campos obrigatórios: email, resultado, recomendacoes" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      to = body.email;
      subject = "Seu diagnóstico de prontidão para IA — Financeit";
      html = buildAssessmentHtml(body);
    } else {
      await client.close();
      return new Response(
        JSON.stringify({ status: "error", message: "type inválido (use 'contact' ou 'assessment')" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Normalize HTML to avoid quoted-printable soft-wrap artifacts (=20, =\n)
    // by collapsing runs of whitespace and breaking lines after tags.
    const normalizedHtml = html
      .replace(/\r\n?|\n/g, "\n")
      .replace(/[\t ]+/g, " ")
      .replace(/\n\s+/g, "\n")
      .replace(/>\s+</g, "><")
      .replace(/>/g, ">\n")
      .split("\n")
      .map((line) => line.trimEnd())
      .filter((line) => line.length > 0)
      .join("\n");

    const sendOptions: Record<string, unknown> = {
      from: `Financeit <${SMTP_USER}>`,
      to,
      subject,
      html: normalizedHtml,
      content: "auto",
    };

    if (body.type === "assessment") {
      sendOptions.bcc = "comercial@financeit.com.br";
    }

    await client.send(sendOptions as never);
    await client.close();

    return new Response(
      JSON.stringify({ status: "success" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Erro ao enviar email:", error);

    try {
      await client.close();
    } catch {
      // noop
    }

    const message = error instanceof Error ? error.message : "Erro desconhecido";

    return new Response(
      JSON.stringify({ status: "error", message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
