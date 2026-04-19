/**
 * Script de teste para validar envio de emails via Nodemailer + SMTP HostGator.
 *
 * Como executar (a partir da pasta backend/):
 *   npx ts-node test-email.ts
 *
 * Pré-requisitos:
 *   - backend/.env configurado com SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *   - dependências instaladas (npm install)
 */

import * as dotenv from "dotenv";
dotenv.config();

import { transporter } from "./src/server";
import {
  sendContactEmail,
  sendAssessmentEmail,
} from "./src/services/emailService";

const TEST_EMAIL =
  process.env.TEST_EMAIL ||
  process.env.CONTACT_TO ||
  process.env.SMTP_USER ||
  "seu-email-de-teste@exemplo.com";

async function testEmailConnection() {
  console.log("🔍 Testando conexão SMTP...");
  await transporter.verify();
  console.log("✅ Conexão SMTP OK");
}

async function testContactEmail() {
  console.log("📧 Testando envio de email de contato (7 campos)...");
  const result = await sendContactEmail({
    nome: "João Silva",
    empresa: "Empresa Teste Ltda",
    cargo: "Diretor de TI",
    email: TEST_EMAIL,
    telefone: "(11) 99999-9999",
    tema: "Quero falar sobre dados, governança e IA",
    mensagem: "Olá, gostaria de mais informações sobre seus serviços.",
  });
  console.log("✅ Email de contato enviado:", result.id);
}

async function testAssessmentEmail() {
  console.log("📊 Testando envio de diagnóstico...");
  const result = await sendAssessmentEmail({
    nome: "Maria Santos",
    email: TEST_EMAIL,
    resultado: "Score: 75/100 — Nível avançado",
    recomendacoes: [
      "Sua empresa está bem preparada para implementar IA.",
      "Recomendamos começar com um projeto piloto.",
    ],
  });
  console.log("✅ Email de diagnóstico enviado:", result.id);
}

async function runAllTests() {
  console.log("🚀 Iniciando testes de email...\n");
  console.log(`📬 Destinatário de teste: ${TEST_EMAIL}\n`);

  await testEmailConnection();
  console.log("");
  await testContactEmail();
  console.log("");
  await testAssessmentEmail();
  console.log("\n✅ Testes concluídos!");
}

runAllTests()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Falha durante os testes:", error);
    process.exit(1);
  });
