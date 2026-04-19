import { transporter } from '../config/email';
import { SendMailOptions } from 'nodemailer';

export async function sendContactEmail(name: string, email: string, message: string): Promise<string> {
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #333;">Nova Mensagem de Contato</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="font-size: 12px; color: #666;">Este email foi enviado através do formulário de contato.</p>
    </div>
  `;

  const mailOptions: SendMailOptions = {
    from: process.env.SMTP_USER || 'noreply@financeit.com.br',
    to: 'contato@financeit.com.br',
    subject: 'Nova Mensagem de Contato - Financeit',
    html: htmlTemplate,
  };

  const info = await transporter.sendMail(mailOptions);
  return info.messageId;
}

export async function sendDiagnosisEmail(name: string, email: string, score: number, recommendations: string): Promise<string> {
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #333;">Resultado do Diagnóstico de IA</h2>
      <p>Olá ${name},</p>
      <p>Obrigado por usar nosso serviço de diagnóstico de IA. Aqui estão seus resultados:</p>
      <p><strong>Pontuação:</strong> ${score}</p>
      <p><strong>Recomendações:</strong></p>
      <p>${recommendations.replace(/\n/g, '<br>')}</p>
      <p>Se tiver dúvidas, entre em contato conosco.</p>
      <hr>
      <p style="font-size: 12px; color: #666;">Este é um email automático. Por favor, não responda.</p>
    </div>
  `;

  const mailOptions: SendMailOptions = {
    from: process.env.SMTP_USER || 'noreply@financeit.com.br',
    to: email,
    subject: 'Seu Resultado de Diagnóstico - Financeit',
    html: htmlTemplate,
  };

  const info = await transporter.sendMail(mailOptions);
  return info.messageId;
}
