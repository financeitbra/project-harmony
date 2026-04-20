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
}

export interface EmailResponse {
  status: "success" | "error";
  message?: string;
}

function getSendEmailUrl(): string {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL;

  if (!baseUrl) {
    throw new Error("A configuração do serviço de envio de e-mail está indisponível.");
  }

  return `${baseUrl}/functions/v1/send-email`;
}

async function invokeSendEmail(body: Record<string, unknown>): Promise<EmailResponse> {
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("A chave pública do serviço de envio de e-mail não foi configurada.");
  }

  const response = await fetch(getSendEmailUrl(), {
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
