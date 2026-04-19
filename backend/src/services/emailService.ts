import { transporter } from '../config/email';
import { SendMailOptions } from 'nodemailer';
import { randomUUID } from 'node:crypto';

export interface ContactData {
  nome: string;
  empresa: string;
  cargo: string;
  email: string;
  telefone: string;
  mensagem: string;
}

export interface AssessmentData {
  email: string;
  resultado: string;
  recomendacoes: string[];
  nome?: string;
}

export interface EmailResult {
  success: boolean;
  id: string;
  messageId?: string;
  accepted?: (string | { address: string })[];
  rejected?: (string | { address: string })[];
}

const FROM = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@financeit.com.br';
const CONTACT_TO = process.env.CONTACT_TO || 'contato@financeit.com.br';

// Escapa HTML para evitar injeção em templates
function escapeHtml(input: string): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(input: string): string {
  return escapeHtml(input).replace(/\n/g, '<br>');
}

export async function sendContactEmail(
  dataOrName: ContactData | string,
  email?: string,
  message?: string
): Promise<EmailResult> {
  // Compat: aceita assinatura antiga (name, email, message) ou nova (ContactData)
  const data: ContactData =
    typeof dataOrName === 'string'
      ? {
          nome: dataOrName,
          empresa: '-',
          cargo: '-',
          email: email || '',
          telefone: '-',
          mensagem: message || '',
        }
      : dataOrName;

  const id = randomUUID();
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #333;">Nova Mensagem de Contato</h2>
      <p><strong>Nome:</strong> ${escapeHtml(data.nome)}</p>
      <p><strong>Empresa:</strong> ${escapeHtml(data.empresa)}</p>
      <p><strong>Cargo:</strong> ${escapeHtml(data.cargo)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Telefone:</strong> ${escapeHtml(data.telefone)}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${nl2br(data.mensagem)}</p>
      <hr>
      <p style="font-size: 12px; color: #666;">ID: ${id}</p>
      <p style="font-size: 12px; color: #666;">Enviado pelo formulário de contato Financeit.</p>
    </div>
  `;

  const mailOptions: SendMailOptions = {
    from: FROM,
    to: CONTACT_TO,
    replyTo: data.email,
    subject: `Nova Mensagem de Contato - ${data.nome}`,
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [contact] Email enviado | id=${id} messageId=${info.messageId}`);
    return {
      success: true,
      id,
      messageId: info.messageId,
      accepted: info.accepted as any,
      rejected: info.rejected as any,
    };
  } catch (error: any) {
    console.error(`❌ [contact] Falha ao enviar | id=${id}`, error?.message || error);
    throw error;
  }
}

export async function sendAssessmentEmail(data: AssessmentData): Promise<EmailResult> {
  const id = randomUUID();
  const recomendacoesHtml = (data.recomendacoes || [])
    .map((r) => `<li>${escapeHtml(r)}</li>`)
    .join('');

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #333;">Resultado da Avaliação de Prontidão em IA</h2>
      <p>Olá${data.nome ? ` ${escapeHtml(data.nome)}` : ''},</p>
      <p>Obrigado por participar da nossa avaliação. Veja seu resultado abaixo:</p>
      <p><strong>Resultado:</strong></p>
      <p>${nl2br(data.resultado)}</p>
      <p><strong>Recomendações:</strong></p>
      <ul>${recomendacoesHtml || '<li>Nenhuma recomendação disponível.</li>'}</ul>
      <hr>
      <p style="font-size: 12px; color: #666;">ID: ${id}</p>
      <p style="font-size: 12px; color: #666;">Este é um email automático. Por favor, não responda.</p>
    </div>
  `;

  const mailOptions: SendMailOptions = {
    from: FROM,
    to: data.email,
    bcc: CONTACT_TO,
    subject: 'Seu Resultado de Prontidão em IA - Financeit',
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [assessment] Email enviado | id=${id} messageId=${info.messageId}`);
    return {
      success: true,
      id,
      messageId: info.messageId,
      accepted: info.accepted as any,
      rejected: info.rejected as any,
    };
  } catch (error: any) {
    console.error(`❌ [assessment] Falha ao enviar | id=${id}`, error?.message || error);
    throw error;
  }
}

// Compat com chamadas existentes que usavam (name, email, score, recommendations)
export async function sendDiagnosisEmail(
  name: string,
  email: string,
  score: number,
  recommendations: string
): Promise<EmailResult> {
  return sendAssessmentEmail({
    nome: name,
    email,
    resultado: `Pontuação: ${score}`,
    recomendacoes: String(recommendations).split('\n').filter(Boolean),
  });
}
