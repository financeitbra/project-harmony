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

export interface ContactEmailPayload {
  nome: string;
  empresa?: string;
  cargo?: string;
  email: string;
  telefone?: string;
  tema?: string;
  mensagem: string;
}

export interface DiagnosisEmailPayload {
  nome?: string;
  email: string;
  resultado: string;
  recomendacoes: string[];
}

export const emailService = {
  sendContact: (data: ContactEmailPayload) =>
    api.post("/api/email/contact", data),

  sendDiagnosis: (data: DiagnosisEmailPayload) =>
    api.post("/api/email/assessment", data),
};

// Compat com chamadas anteriores
export const sendContactEmail = (data: ContactEmailPayload) =>
  emailService.sendContact(data).then((r) => r.data);

export const sendDiagnosisEmail = (data: DiagnosisEmailPayload) =>
  emailService.sendDiagnosis(data).then((r) => r.data);

export { BACKEND_URL };
