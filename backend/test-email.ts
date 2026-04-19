/**
 * Script de teste para validar envio de emails via Nodemailer + SMTP HostGator.
 *
 * Como executar (a partir da pasta backend/):
 *   npm run test:email
 *   ou: npx ts-node test-email.ts
 *
 * Pré-requisitos:
 *   - backend/.env configurado com SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *   - dependências instaladas (npm install)
 */

import path from "node:path";
import dotenv from "dotenv";
import { transporter } from "./src/config/email";
import {
  sendContactEmail,
  sendDiagnosisEmail,
} from "./src/services/emailService";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const TEST_EMAIL =
  process.env.TEST_EMAIL ||
  process.env.CONTACT_TO ||
  process.env.SMTP_USER ||
  "seu-email-de-teste@exemplo.com";

async function testEmailConnection() {
  try {
    console.log("🔍 Testando conexão SMTP...");
    await transporter.verify();
    console.log("✅ Conexão SMTP OK");
  } catch (error) {
    console.error("❌ Erro na conexão SMTP:", error);
    throw error;
  }
}

async function testContactEmail() {
  try {
    console.log("📧 Testando envio de email de contato...");
    const result = await sendContactEmail(
      "João Silva",
      TEST_EMAIL,
      "Olá, gostaria de mais informações sobre seus serviços."
    );
    console.log("✅ Email de contato enviado:", result.messageId);
    console.log("   accepted:", result.accepted);
    console.log("   rejected:", result.rejected);
  } catch (error) {
    console.error("❌ Erro ao enviar email de contato:", error);
    throw error;
  }
}

async function testDiagnosisEmail() {
  try {
    console.log("📊 Testando envio de diagnóstico...");
    const result = await sendDiagnosisEmail(
      "Maria Santos",
      TEST_EMAIL,
      75,
      "Sua empresa está bem preparada para implementar IA.\nRecomendamos começar com um projeto piloto."
    );
    console.log("✅ Email de diagnóstico enviado:", result.messageId);
    console.log("   accepted:", result.accepted);
    console.log("   rejected:", result.rejected);
  } catch (error) {
    console.error("❌ Erro ao enviar diagnóstico:", error);
    throw error;
  }
}

async function runAllTests() {
  console.log("🚀 Iniciando testes de email...\n");
  console.log(`📬 Destinatário de teste: ${TEST_EMAIL}\n`);

  await testEmailConnection();
  console.log("");
  await testContactEmail();
  console.log("");
  await testDiagnosisEmail();
  console.log("\n✅ Testes concluídos!");
}

runAllTests()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Falha durante os testes:", error);
    process.exit(1);
  });
