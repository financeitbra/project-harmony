// Envio de emails via backend function usando SMTP HostGator.

export interface ContactEmailPayload {
  nome: string;
  email: string;
  mensagem: string;
  empresa?: string;
  cargo?: string;
  telefone?: string;
}

export interface AssessmentEmailPayload {
  email: string;
  resultado: string;
  recomendacoes: string[];
  nome?: string;
  respostas?: Array<{ question: string; answer: string }>;
}

export interface EmailResponse {
  status: "success" | "error";
  message?: string;
}

const FALLBACK_EMAIL_FUNCTION_URL = "https://mgmhhltfdiigsvkirgyz.supabase.co";
const FALLBACK_EMAIL_FUNCTION_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbWhobHRmZGlpZ3N2a2lyZ3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MjcxNzgsImV4cCI6MjA5MjEwMzE3OH0.b0EG7UMCDHKPc9N_LyJCoAlaOYBfWhRJMu67PcYIzdQ";

function getSendEmailUrl(baseUrl?: string): string {
  if (!baseUrl) {
    throw new Error("A configuração do serviço de envio de e-mail está indisponível.");
  }

  return `${baseUrl}/functions/v1/send-email`;
}

async function invokeSendEmail(body: Record<string, unknown>): Promise<EmailResponse> {
  const configuredBaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const configuredPublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const baseUrl = configuredBaseUrl || FALLBACK_EMAIL_FUNCTION_URL;
  const publishableKey = configuredPublishableKey || FALLBACK_EMAIL_FUNCTION_KEY;

  try {
    if (configuredBaseUrl && configuredPublishableKey) {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase.functions.invoke<EmailResponse>("send-email", {
        body,
      });

      if (!error && data?.status !== "error") {
        return data ?? { status: "success" };
      }

      console.error("Falha ao invocar o serviço de e-mail pelo cliente integrado:", error ?? data);
    }
  } catch (invokeError) {
    console.error("Erro inesperado ao invocar o serviço de e-mail pelo cliente integrado:", invokeError);
  }

  const response = await fetch(getSendEmailUrl(baseUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json().catch(() => null)) as EmailResponse | null;

  if (!response.ok || data?.status === "error") {
    throw new Error(data?.message || "Não foi possível enviar o e-mail no momento.");
  }

  return data ?? { status: "success" };
}

export const emailService = {
  sendContact: (data: ContactEmailPayload) =>
    invokeSendEmail({ type: "contact", ...data }),

  sendAssessment: (data: AssessmentEmailPayload) =>
    invokeSendEmail({ type: "assessment", ...data }),
};

/* ───── Compat com chamadas antigas ───── */

export const sendContactEmail = (data: {
  name: string;
  email: string;
  message: string;
  empresa?: string;
  cargo?: string;
  telefone?: string;
}) =>
  emailService.sendContact({
    nome: data.name,
    email: data.email,
    mensagem: data.message,
    empresa: data.empresa,
    cargo: data.cargo,
    telefone: data.telefone,
  });

export const sendDiagnosisEmail = (data: {
  name?: string;
  email: string;
  score: number;
  recommendations: string;
}) =>
  emailService.sendAssessment({
    email: data.email,
    nome: data.name,
    resultado: `Pontuação: ${data.score}`,
    recomendacoes: data.recommendations.split("\n").filter(Boolean),
  });
