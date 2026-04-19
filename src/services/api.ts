// Centraliza chamadas ao backend externo (Node.js/Express no HostGator).
// Configure VITE_BACKEND_URL no .env para apontar para produção.
import axios from "axios";

const BACKEND_URL =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) ||
  "http://localhost:3000";

export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

/* ───── Tipos alinhados ao backend (backend/src/routes/email.ts) ───── */

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
  id?: string;
  message?: string;
}

export const emailService = {
  sendContact: (data: ContactEmailPayload) =>
    api.post<EmailResponse>("/api/email/contact", data).then((r) => r.data),

  sendAssessment: (data: AssessmentEmailPayload) =>
    api.post<EmailResponse>("/api/email/assessment", data).then((r) => r.data),

  health: () => api.get<{ status: string }>("/health").then((r) => r.data),
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

export { BACKEND_URL };
