import express, { Request, Response } from 'express';
import { sendContactEmail, sendDiagnosisEmail } from '../services/emailService';

const router = express.Router();

router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ status: 'error', message: 'Nome, email e mensagem são obrigatórios.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: 'error', message: 'Formato de email inválido.' });
    }

    await sendContactEmail(name, email, message);
    res.status(200).json({ status: 'success', message: 'Email de contato enviado com sucesso.' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Erro ao enviar email.' });
  }
});

router.post('/diagnosis', async (req: Request, res: Response) => {
  try {
    const { name, email, score, recommendations } = req.body;

    if (!name || !email || score === undefined || !recommendations) {
      return res.status(400).json({ status: 'error', message: 'Todos os campos são obrigatórios.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: 'error', message: 'Formato de email inválido.' });
    }

    await sendDiagnosisEmail(name, email, score, recommendations);
    res.status(200).json({ status: 'success', message: 'Email de diagnóstico enviado com sucesso.' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Erro ao enviar email.' });
  }
});

export default router;
