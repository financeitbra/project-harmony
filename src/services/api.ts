// Envio de emails via Edge Function (Lovable Cloud) usando SMTP HostGator.
import { supabase } from "@/integrations/supabase/client";

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

async function invokeSendEmail(body: Record<string, unknown>): Promise<EmailResponse> {
  const { data, error } = await supabase.functions.invoke("send-email", { body });
  if (error) {
    return { status: "error", message: error.message };
  }
  return (data as EmailResponse) ?? { status: "success" };
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
