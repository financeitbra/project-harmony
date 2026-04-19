import { Router, Request, Response } from 'express';
import { sendContactEmail, sendAssessmentEmail } from '../services/emailService';

const router = Router();

interface ContactData {
  nome: string;
  empresa?: string;
  cargo?: string;
  email: string;
  telefone?: string;
  tema?: string;
  mensagem: string;
}

interface AssessmentData {
  email: string;
  resultado: string;
  recomendacoes: string[];
  nome?: string;
}

router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { nome, empresa, cargo, email, telefone, tema, mensagem }: ContactData = req.body;

    if (!nome || !email || !mensagem) {
      return res.status(400).json({ status: 'error', message: 'Campos obrigatórios: nome, email, mensagem' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: 'error', message: 'E-mail inválido' });
    }

    const contactData: ContactData = { nome, empresa, cargo, email, telefone, tema, mensagem };
    const result = await sendContactEmail(contactData);

    res.json({ status: 'success', id: result.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ status: 'error', message });
  }
});

router.post('/assessment', async (req: Request, res: Response) => {
  try {
    const { email, resultado, recomendacoes, nome }: AssessmentData = req.body;

    if (!email || !resultado || !recomendacoes) {
      return res.status(400).json({ status: 'error', message: 'Campos obrigatórios: email, resultado, recomendacoes' });
    }

    const assessmentData: AssessmentData = { email, resultado, recomendacoes, nome };
    const result = await sendAssessmentEmail(assessmentData);

    res.json({ status: 'success', id: result.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ status: 'error', message });
  }
});

export default router;
