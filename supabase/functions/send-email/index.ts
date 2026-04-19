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

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildContactHtml(d: ContactPayload): string {
  return `
    <h1>Novo contato recebido</h1>
    <p><strong>Nome:</strong> ${escapeHtml(d.nome)}</p>
    ${d.empresa ? `<p><strong>Empresa:</strong> ${escapeHtml(d.empresa)}</p>` : ""}
    ${d.cargo ? `<p><strong>Cargo:</strong> ${escapeHtml(d.cargo)}</p>` : ""}
    <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
    ${d.telefone ? `<p><strong>Telefone:</strong> ${escapeHtml(d.telefone)}</p>` : ""}
    <p><strong>Mensagem:</strong></p>
    <p>${escapeHtml(d.mensagem).replace(/\n/g, "<br/>")}</p>
  `;
}

function buildAssessmentHtml(d: AssessmentPayload): string {
  return `
    <h1>Resultado da Avaliação de Prontidão IA</h1>
    ${d.nome ? `<p><strong>Nome:</strong> ${escapeHtml(d.nome)}</p>` : ""}
    <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
    <p><strong>Resultado:</strong> ${escapeHtml(d.resultado)}</p>
    <p><strong>Recomendações:</strong></p>
    <ul>${d.recomendacoes.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
  `;
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
      SMTP_HOST: !!SMTP_HOST,
      SMTP_PORT: !!SMTP_PORT,
      SMTP_USER: !!SMTP_USER,
      SMTP_PASS: !!SMTP_PASS,
      CONTACT_TO: !!CONTACT_TO,
    });
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
      subject = `Novo contato — ${body.nome}`;
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
      subject = "Resultado da sua Avaliação de Prontidão IA";
      html = buildAssessmentHtml(body);
    } else {
      await client.close();
      return new Response(
        JSON.stringify({ status: "error", message: "type inválido (use 'contact' ou 'assessment')" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await client.send({
      from: SMTP_USER,
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
