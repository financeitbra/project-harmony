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

// ───────────────────────────── Branding ─────────────────────────────
const BRAND = {
  name: "Financeit",
  primary: "#0B5FFF",     // azul Financeit
  primaryDark: "#0A3FA8",
  accent: "#00C2A8",      // verde-água
  dark: "#0B1220",
  text: "#1F2937",
  muted: "#6B7280",
  bg: "#F4F7FB",
  card: "#FFFFFF",
  border: "#E5EAF2",
  site: "https://financeit.com.br",
  contact: "https://financeit.com.br/contato",
  // Logo embutido em SVG (data URI) — não precisa hospedar imagem
  logoSvg: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="44" viewBox="0 0 220 44">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0B5FFF"/>
          <stop offset="100%" stop-color="#00C2A8"/>
        </linearGradient>
      </defs>
      <rect x="2" y="6" width="32" height="32" rx="8" fill="url(#g)"/>
      <text x="12" y="29" font-family="Arial,Helvetica,sans-serif" font-size="20" font-weight="800" fill="#fff">F</text>
      <text x="44" y="29" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="800" fill="#0B1220">Financeit</text>
    </svg>`
  )}`,
};

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ───────────────────────────── Layout base ─────────────────────────────
function baseLayout(opts: { title: string; preheader: string; bodyHtml: string }): string {
  const { title, preheader, bodyHtml } = opts;
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.bg};font-family:Inter,Segoe UI,Arial,sans-serif;color:${BRAND.text};">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(11,18,32,0.06);">
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 60%, ${BRAND.accent} 130%);padding:24px 28px;">
                <table role="presentation" width="100%"><tr>
                  <td align="left">
                    <img src="${BRAND.logoSvg}" alt="${BRAND.name}" height="36" style="display:block;border:0;outline:none;text-decoration:none;height:36px;" />
                  </td>
                  <td align="right" style="color:#E6F0FF;font-size:12px;font-weight:600;letter-spacing:.4px;text-transform:uppercase;">
                    Dados • IA • Performance
                  </td>
                </tr></table>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:32px 28px 8px 28px;">
                ${bodyHtml}
              </td>
            </tr>
            <!-- CTA institucional -->
            <tr>
              <td style="padding:8px 28px 28px 28px;">
                <table role="presentation" width="100%" style="background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:12px;">
                  <tr><td style="padding:20px 22px;">
                    <div style="font-size:15px;font-weight:700;color:${BRAND.dark};margin-bottom:6px;">Quer destravar dados e IA na sua empresa?</div>
                    <div style="font-size:14px;color:${BRAND.muted};margin-bottom:14px;">A Financeit conecta estratégia, governança e execução para transformar dados em resultado de negócio.</div>
                    <a href="${BRAND.contact}" style="display:inline-block;background:${BRAND.primary};color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 18px;border-radius:10px;">Falar com um especialista →</a>
                  </td></tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background:${BRAND.dark};padding:20px 28px;color:#9CA3AF;font-size:12px;line-height:1.6;">
                <strong style="color:#fff;">${BRAND.name}</strong> — Inteligência de dados para decisões de alto impacto.<br/>
                <a href="${BRAND.site}" style="color:#9CA3AF;text-decoration:underline;">financeit.com.br</a> • Este é um e-mail automático, mas você pode responder que retornamos.
              </td>
            </tr>
          </table>
          <div style="max-width:640px;color:#9CA3AF;font-size:11px;padding:14px 8px;">© ${new Date().getFullYear()} ${BRAND.name}. Todos os direitos reservados.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// ───────────────────────────── Contato ─────────────────────────────
function buildContactHtml(d: ContactPayload): string {
  const row = (label: string, value?: string) =>
    value
      ? `<tr>
           <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-size:13px;color:${BRAND.muted};width:130px;">${escapeHtml(label)}</td>
           <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-size:14px;color:${BRAND.dark};font-weight:600;">${escapeHtml(value)}</td>
         </tr>`
      : "";

  const body = `
    <div style="font-size:12px;font-weight:700;color:${BRAND.primary};letter-spacing:.6px;text-transform:uppercase;margin-bottom:8px;">Novo contato recebido</div>
    <h1 style="margin:0 0 8px 0;font-size:24px;line-height:1.25;color:${BRAND.dark};">${escapeHtml(d.nome)} entrou em contato</h1>
    <p style="margin:0 0 20px 0;font-size:14px;color:${BRAND.muted};">Confira abaixo os dados enviados pelo formulário do site.</p>

    <table role="presentation" width="100%" style="border-top:1px solid ${BRAND.border};margin-bottom:20px;">
      ${row("Nome", d.nome)}
      ${row("Empresa", d.empresa)}
      ${row("Cargo", d.cargo)}
      ${row("Email", d.email)}
      ${row("Telefone", d.telefone)}
    </table>

    <div style="font-size:13px;font-weight:700;color:${BRAND.dark};margin-bottom:8px;">Mensagem</div>
    <div style="background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:12px;padding:16px 18px;font-size:14px;line-height:1.6;color:${BRAND.text};white-space:pre-wrap;">${escapeHtml(d.mensagem).replace(/\n/g, "<br/>")}</div>
  `;
  return baseLayout({
    title: `Novo contato — ${d.nome}`,
    preheader: `Contato de ${d.nome}${d.empresa ? " • " + d.empresa : ""}`,
    bodyHtml: body,
  });
}

// ───────────────────────────── Assessment ─────────────────────────────
function parseScoreFromResultado(resultado: string): number | null {
  // tenta extrair número (ex.: "Pontuação: 72" ou "72%")
  const m = resultado.match(/(\d{1,3})(?:[.,]\d+)?/);
  if (!m) return null;
  const n = Math.max(0, Math.min(100, parseInt(m[1], 10)));
  return Number.isFinite(n) ? n : null;
}

function maturityFromScore(score: number): { label: string; color: string; descricao: string } {
  if (score >= 80) return { label: "Avançado", color: "#16A34A", descricao: "Sua organização está madura em dados e IA — é hora de escalar casos de uso e ROI." };
  if (score >= 60) return { label: "Intermediário", color: BRAND.primary, descricao: "Boa base. Com governança e priorização certas, IA vira vantagem competitiva." };
  if (score >= 40) return { label: "Em desenvolvimento", color: "#D97706", descricao: "Há fundações importantes faltando. Estruturar dados é o próximo passo crítico." };
  return { label: "Inicial", color: "#DC2626", descricao: "Oportunidade enorme: começar com diagnóstico e quick wins acelera muito a jornada." };
}

function gaugeSvg(score: number, color: string): string {
  // Gauge semicircular em SVG (renderiza na maioria dos clientes modernos)
  const pct = Math.max(0, Math.min(100, score));
  const angle = (pct / 100) * 180;
  const r = 90, cx = 110, cy = 110;
  const rad = (deg: number) => (Math.PI * (180 - deg)) / 180;
  const x = cx + r * Math.cos(rad(angle));
  const y = cy - r * Math.sin(rad(angle));
  const largeArc = angle > 180 ? 1 : 0;
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="240" height="140" viewBox="0 0 220 130">
    <path d="M20,110 A90,90 0 0 1 200,110" fill="none" stroke="${BRAND.border}" stroke-width="18" stroke-linecap="round"/>
    <path d="M20,110 A90,90 0 0 1 ${x.toFixed(2)},${y.toFixed(2)}" fill="none" stroke="${color}" stroke-width="18" stroke-linecap="round"/>
    <text x="110" y="98" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="800" fill="${BRAND.dark}">${pct}</text>
    <text x="110" y="120" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="${BRAND.muted}">/ 100</text>
  </svg>`;
}

function barRow(label: string, pct: number, color: string): string {
  const w = Math.max(2, Math.min(100, pct));
  return `
    <tr>
      <td style="padding:10px 0;font-size:13px;color:${BRAND.dark};font-weight:600;width:55%;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;width:45%;">
        <table role="presentation" width="100%"><tr>
          <td style="background:${BRAND.bg};border-radius:999px;height:10px;position:relative;">
            <div style="background:${color};width:${w}%;height:10px;border-radius:999px;"></div>
          </td>
        </tr></table>
      </td>
    </tr>`;
}

function buildAssessmentHtml(d: AssessmentPayload): string {
  const score = parseScoreFromResultado(d.resultado) ?? 50;
  const maturity = maturityFromScore(score);

  // Distribui as recomendações como "dimensões" visuais (gráfico de barras)
  // Caso receba poucas, usa defaults coerentes com o score.
  const dims = (d.recomendacoes && d.recomendacoes.length >= 3
    ? d.recomendacoes.slice(0, 5).map((r, i) => ({
        label: r.length > 48 ? r.slice(0, 45) + "…" : r,
        pct: Math.max(20, Math.min(95, score + (i % 2 === 0 ? -8 + i * 4 : 6 - i * 3))),
      }))
    : [
        { label: "Estratégia & Contexto", pct: score + 5 },
        { label: "Dados & Infraestrutura", pct: score - 8 },
        { label: "Governança & Segurança", pct: score - 4 },
        { label: "Casos de Uso de IA", pct: score + 2 },
        { label: "Execução & Cultura", pct: score - 10 },
      ]
  ).map((x) => ({ ...x, pct: Math.max(10, Math.min(95, x.pct)) }));

  const recsHtml = (d.recomendacoes ?? [])
    .map(
      (r) => `
      <tr><td style="padding:10px 0;border-bottom:1px dashed ${BRAND.border};font-size:14px;color:${BRAND.text};">
        <span style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;background:${BRAND.primary};color:#fff;border-radius:999px;font-size:12px;font-weight:700;margin-right:10px;vertical-align:middle;">✓</span>
        ${escapeHtml(r)}
      </td></tr>`
    )
    .join("");

  const body = `
    <div style="font-size:12px;font-weight:700;color:${BRAND.primary};letter-spacing:.6px;text-transform:uppercase;margin-bottom:8px;">Avaliação de Prontidão para IA</div>
    <h1 style="margin:0 0 6px 0;font-size:26px;line-height:1.25;color:${BRAND.dark};">${d.nome ? `Olá, ${escapeHtml(d.nome)}!` : "Seu diagnóstico chegou"} 👋</h1>
    <p style="margin:0 0 22px 0;font-size:14px;color:${BRAND.muted};">Veja abaixo o resultado da sua avaliação e por onde a Financeit pode acelerar sua jornada de dados e IA.</p>

    <!-- Score card -->
    <table role="presentation" width="100%" style="background:linear-gradient(135deg, #F0F6FF 0%, #ECFFFB 100%);border:1px solid ${BRAND.border};border-radius:14px;margin-bottom:22px;">
      <tr>
        <td align="center" style="padding:18px 8px 8px 8px;" width="55%">
          ${gaugeSvg(score, maturity.color)}
        </td>
        <td style="padding:18px 22px;" width="45%">
          <div style="font-size:12px;font-weight:700;color:${BRAND.muted};text-transform:uppercase;letter-spacing:.5px;">Nível de maturidade</div>
          <div style="font-size:22px;font-weight:800;color:${maturity.color};margin:4px 0 8px;">${maturity.label}</div>
          <div style="font-size:13px;color:${BRAND.text};line-height:1.5;">${escapeHtml(maturity.descricao)}</div>
        </td>
      </tr>
    </table>

    <!-- Bar chart -->
    <div style="font-size:13px;font-weight:700;color:${BRAND.dark};margin:6px 0 6px;">Dimensões avaliadas</div>
    <table role="presentation" width="100%" style="margin-bottom:22px;">
      ${dims.map((x) => barRow(x.label, x.pct, BRAND.primary)).join("")}
    </table>

    ${
      recsHtml
        ? `<div style="font-size:13px;font-weight:700;color:${BRAND.dark};margin:6px 0 6px;">Recomendações para os próximos passos</div>
           <table role="presentation" width="100%" style="margin-bottom:14px;">${recsHtml}</table>`
        : ""
    }

    <!-- Comercial -->
    <table role="presentation" width="100%" style="background:${BRAND.dark};border-radius:14px;margin-top:10px;">
      <tr><td style="padding:22px 22px;color:#E6EEFF;">
        <div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:6px;">Como a Financeit acelera o seu próximo passo</div>
        <div style="font-size:13px;line-height:1.6;color:#C7D2FE;margin-bottom:14px;">
          Diagnóstico aprofundado, estruturação de dados, governança, BI e casos de uso de IA com squads especializados — entregando ROI mensurável em poucas semanas.
        </div>
        <a href="${BRAND.contact}" style="display:inline-block;background:${BRAND.accent};color:#04221E;text-decoration:none;font-weight:800;font-size:14px;padding:12px 18px;border-radius:10px;">Quero conversar com um especialista</a>
      </td></tr>
    </table>
  `;

  return baseLayout({
    title: "Resultado da sua Avaliação de Prontidão IA",
    preheader: `Seu nível: ${maturity.label} (${score}/100) — veja recomendações da Financeit.`,
    bodyHtml: body,
  });
}

// ───────────────────────────── Handler ─────────────────────────────
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
    console.error("Missing SMTP env vars");
    return new Response(
      JSON.stringify({ status: "error", message: "Configuração SMTP ausente." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ status: "error", message: "JSON inválido." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const port = parseInt(SMTP_PORT, 10);
  const client = new SMTPClient({
    connection: {
      hostname: SMTP_HOST,
      port,
      tls: port === 465,
      auth: { username: SMTP_USER, password: SMTP_PASS },
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
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      to = CONTACT_TO;
      subject = `📬 Novo contato — ${body.nome}${body.empresa ? " (" + body.empresa + ")" : ""}`;
      html = buildContactHtml(body);
    } else if (body.type === "assessment") {
      if (!body.email || !body.resultado || !Array.isArray(body.recomendacoes)) {
        await client.close();
        return new Response(
          JSON.stringify({ status: "error", message: "Campos obrigatórios: email, resultado, recomendacoes" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      to = body.email;
      subject = "🚀 Seu Diagnóstico de Prontidão para IA — Financeit";
      html = buildAssessmentHtml(body);
    } else {
      await client.close();
      return new Response(
        JSON.stringify({ status: "error", message: "type inválido (use 'contact' ou 'assessment')" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await client.send({
      from: `Financeit <${SMTP_USER}>`,
      to,
      subject,
      html,
      content: "auto",
    });
    await client.close();

    return new Response(
      JSON.stringify({ status: "success" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    try { await client.close(); } catch (_) { /* ignore */ }
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ status: "error", message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
