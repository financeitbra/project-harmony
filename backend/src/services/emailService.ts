import { transporter } from '../server';
import { SendMailOptions } from 'nodemailer';

interface ContactData {
  nome: string;
  empresa?: string;
  cargo?: string;
  email: string;
  telefone?: string;
  mensagem: string;
}

interface AssessmentData {
  email: string;
  resultado: string;
  recomendacoes: string[];
  nome?: string;
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendContactEmail(data: ContactData): Promise<{ id: string }> {
  try {
    const html = `
      <h1>Contato Recebido</h1>
      <p><strong>Nome:</strong> ${escapeHtml(data.nome)}</p>
      ${data.empresa ? `<p><strong>Empresa:</strong> ${escapeHtml(data.empresa)}</p>` : ''}
      ${data.cargo ? `<p><strong>Cargo:</strong> ${escapeHtml(data.cargo)}</p>` : ''}
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${data.telefone ? `<p><strong>Telefone:</strong> ${escapeHtml(data.telefone)}</p>` : ''}
      <p><strong>Mensagem:</strong> ${escapeHtml(data.mensagem).replace(/\n/g, '<br />')}</p>
    `;

    const mailOptions: SendMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO,
      subject: 'Novo Contato Recebido',
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return { id: info.messageId };
  } catch (error) {
    console.error('Erro ao enviar email de contato:', error);
    throw error;
  }
}

async function sendAssessmentEmail(data: AssessmentData): Promise<{ id: string }> {
  try {
    const recomendacoes = Array.isArray(data.recomendacoes) ? data.recomendacoes : [];
    const html = `
      <h1>Resultado da Avaliação</h1>
      ${data.nome ? `<p><strong>Nome:</strong> ${escapeHtml(data.nome)}</p>` : ''}
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Resultado:</strong> ${escapeHtml(data.resultado)}</p>
      <p><strong>Recomendações:</strong></p>
      <ul>
        ${recomendacoes.map((rec) => `<li>${escapeHtml(rec)}</li>`).join('')}
      </ul>
    `;

    const mailOptions: SendMailOptions = {
      from: process.env.SMTP_USER,
      to: data.email,
      subject: 'Resultado da Sua Avaliação',
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return { id: info.messageId };
  } catch (error) {
    console.error('Erro ao enviar email de avaliação:', error);
    throw error;
  }
}

export { sendContactEmail, sendAssessmentEmail };
