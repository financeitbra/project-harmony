import express, { Request, Response } from 'express';
import {
  sendContactEmail,
  sendAssessmentEmail,
  ContactData,
  AssessmentData,
} from '../services/emailService';
import { transporter } from '../config/email';

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = {
  nome: 100,
  empresa: 150,
  cargo: 100,
  email: 255,
  telefone: 30,
  mensagem: 2000,
  resultado: 5000,
  recomendacao: 1000,
};

function bad(res: Response, message: string) {
  return res.status(400).json({ success: false, message });
}

router.get('/health', async (_req: Request, res: Response) => {
  try {
    await transporter.verify();
    return res.status(200).json({ status: 'OK', smtp: 'connected' });
  } catch (error: any) {
    return res
      .status(503)
      .json({ status: 'ERROR', smtp: 'disconnected', message: error?.message || 'SMTP error' });
  }
});

router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { nome, empresa, cargo, email, telefone, mensagem } = (req.body || {}) as Partial<ContactData>;

    if (!nome || !empresa || !cargo || !email || !telefone || !mensagem) {
      return bad(res, 'Todos os campos são obrigatórios.');
    }
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return bad(res, 'Formato de email inválido.');
    }
    if (
      nome.length > MAX.nome ||
      empresa.length > MAX.empresa ||
      cargo.length > MAX.cargo ||
      email.length > MAX.email ||
      telefone.length > MAX.telefone ||
      mensagem.length > MAX.mensagem
    ) {
      return bad(res, 'Um ou mais campos excedem o tamanho máximo permitido.');
    }

    const result = await sendContactEmail({
      nome: nome.trim(),
      empresa: empresa.trim(),
      cargo: cargo.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
      mensagem: mensagem.trim(),
    });

    return res
      .status(200)
      .json({ success: true, message: 'Email enviado', id: result.id });
  } catch (error: any) {
    console.error('❌ [POST /contact]', error?.message || error);
    return res
      .status(500)
      .json({ success: false, message: 'Erro ao enviar email de contato.' });
  }
});

router.post('/assessment', async (req: Request, res: Response) => {
  try {
    const { email, resultado, recomendacoes, nome } = (req.body || {}) as Partial<AssessmentData>;

    if (!email || !resultado || !recomendacoes) {
      return bad(res, 'Campos obrigatórios: email, resultado, recomendacoes.');
    }
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return bad(res, 'Formato de email inválido.');
    }
    if (!Array.isArray(recomendacoes) || recomendacoes.some((r) => typeof r !== 'string')) {
      return bad(res, 'recomendacoes deve ser um array de strings.');
    }
    if (
      email.length > MAX.email ||
      resultado.length > MAX.resultado ||
      recomendacoes.some((r) => r.length > MAX.recomendacao)
    ) {
      return bad(res, 'Um ou mais campos excedem o tamanho máximo permitido.');
    }

    const result = await sendAssessmentEmail({
      email: email.trim(),
      resultado,
      recomendacoes,
      nome: nome?.trim(),
    });

    return res
      .status(200)
      .json({ success: true, message: 'Email enviado', id: result.id });
  } catch (error: any) {
    console.error('❌ [POST /assessment]', error?.message || error);
    return res
      .status(500)
      .json({ success: false, message: 'Erro ao enviar email de avaliação.' });
  }
});

// Compat com rota antiga
router.post('/diagnosis', async (req: Request, res: Response) => {
  try {
    const { name, email, score, recommendations } = req.body || {};
    if (!name || !email || score === undefined || !recommendations) {
      return bad(res, 'Todos os campos são obrigatórios.');
    }
    if (!EMAIL_REGEX.test(email)) {
      return bad(res, 'Formato de email inválido.');
    }
    const result = await sendAssessmentEmail({
      nome: name,
      email,
      resultado: `Pontuação: ${score}`,
      recomendacoes: String(recommendations).split('\n').filter(Boolean),
    });
    return res
      .status(200)
      .json({ success: true, message: 'Email enviado', id: result.id });
  } catch (error: any) {
    console.error('❌ [POST /diagnosis]', error?.message || error);
    return res.status(500).json({ success: false, message: 'Erro ao enviar email.' });
  }
});

export default router;
