import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { transporter, sendContactEmail, sendAssessmentEmail } from "./emailService";

const router = express.Router();

// Structured logging function
interface LogEntry {
  level: "info" | "error" | "warn";
  message: string;
  timestamp: string;
  route?: string;
  error?: any;
}

const log = (entry: LogEntry) => {
  console.log(JSON.stringify(entry));
};

// Generate a simple unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validation rules for ContactData
const contactValidationRules = [
  body("nome").isString().notEmpty().withMessage("Nome é obrigatório e deve ser uma string."),
  body("empresa").isString().notEmpty().withMessage("Empresa é obrigatória e deve ser uma string."),
  body("cargo").isString().notEmpty().withMessage("Cargo é obrigatório e deve ser uma string."),
  body("email").isEmail().normalizeEmail().withMessage("Email deve ser um endereço válido."),
  body("telefone")
    .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)
    .withMessage("Telefone deve ser um número brasileiro válido (ex: (11) 99999-9999)."),
  body("tema")
    .isIn(["finance", "investment", "consulting", "tax", "audit"])
    .withMessage("Tema deve ser um dos valores permitidos: finance, investment, consulting, tax, audit."),
  body("mensagem")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Mensagem é obrigatória e deve ter pelo menos 10 caracteres."),
];

// Validation rules for AssessmentData
const assessmentValidationRules = [
  body("email").isEmail().normalizeEmail().withMessage("Email deve ser um endereço válido."),
  body("resultado").isObject().withMessage("Resultado deve ser um objeto."),
  body("recomendacoes").isString().notEmpty().withMessage("Recomendações são obrigatórias e devem ser uma string."),
  body("nome").isString().notEmpty().withMessage("Nome é obrigatório e deve ser uma string."),
];

// POST /api/email/contact
router.post("/contact", contactValidationRules, async (req: Request, res: Response) => {
  const id = generateId();
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      log({
        level: "warn",
        message: "Validation errors in contact endpoint",
        timestamp: new Date().toISOString(),
        route: "/contact",
        error: errors.array(),
      });
      return res.status(400).json({ id, success: false, message: "Dados inválidos.", errors: errors.array() });
    }

    const { nome, empresa, cargo, email, telefone, tema, mensagem } = req.body;
    await sendContactEmail({ nome, empresa, cargo, email, telefone, tema, mensagem });

    log({
      level: "info",
      message: "Contact email sent successfully",
      timestamp: new Date().toISOString(),
      route: "/contact",
    });
    res.status(200).json({ id, success: true, message: "Email de contato enviado com sucesso." });
  } catch (error) {
    log({
      level: "error",
      message: "Error sending contact email",
      timestamp: new Date().toISOString(),
      route: "/contact",
      error: error.message,
    });
    res.status(500).json({ id, success: false, message: "Erro interno do servidor ao enviar email de contato." });
  }
});

// POST /api/email/assessment
router.post("/assessment", assessmentValidationRules, async (req: Request, res: Response) => {
  const id = generateId();
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      log({
        level: "warn",
        message: "Validation errors in assessment endpoint",
        timestamp: new Date().toISOString(),
        route: "/assessment",
        error: errors.array(),
      });
      return res.status(400).json({ id, success: false, message: "Dados inválidos.", errors: errors.array() });
    }

    const { email, resultado, recomendacoes, nome } = req.body;
    await sendAssessmentEmail({ email, resultado, recomendacoes, nome });

    log({
      level: "info",
      message: "Assessment email sent successfully",
      timestamp: new Date().toISOString(),
      route: "/assessment",
    });
    res.status(200).json({ id, success: true, message: "Email de avaliação enviado com sucesso." });
  } catch (error) {
    log({
      level: "error",
      message: "Error sending assessment email",
      timestamp: new Date().toISOString(),
      route: "/assessment",
      error: error.message,
    });
    res.status(500).json({ id, success: false, message: "Erro interno do servidor ao enviar email de avaliação." });
  }
});

// GET /api/email/health
router.get("/health", async (req: Request, res: Response) => {
  const id = generateId();
  try {
    await transporter.verify();
    log({ level: "info", message: "SMTP health check passed", timestamp: new Date().toISOString(), route: "/health" });
    res.status(200).json({ id, success: true, message: "Serviço de email está saudável." });
  } catch (error) {
    log({
      level: "error",
      message: "SMTP health check failed",
      timestamp: new Date().toISOString(),
      route: "/health",
      error: error.message,
    });
    res.status(503).json({ id, success: false, message: "Serviço de email indisponível." });
  }
});

export default router;
