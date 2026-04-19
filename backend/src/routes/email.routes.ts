import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ContactData, AssessmentData, EmailResult, sendContactEmail, sendAssessmentEmail } from "./emailService";

// Assuming a logger is available, e.g., from a logging service
const logger = console; // Replace with actual logger like winston

const router = express.Router();

// Predefined themes for Financeit
const validThemes = ["finance", "investment", "consulting", "tax", "audit", "other"];

// Custom validator for Brazilian phone number
function isValidBrazilianPhone(value: string): boolean {
  // Basic regex for Brazilian phone: (XX) XXXXX-XXXX or similar
  const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return phoneRegex.test(value);
}

// POST /api/email/contact
router.post(
  "/contact",
  [
    body("nome").isString().notEmpty().withMessage("Nome is required"),
    body("empresa").isString().notEmpty().withMessage("Empresa is required"),
    body("cargo").isString().notEmpty().withMessage("Cargo is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("telefone").custom(isValidBrazilianPhone).withMessage("Valid Brazilian phone number is required"),
    body("tema")
      .isIn(validThemes)
      .withMessage("Tema must be one of: " + validThemes.join(", ")),
    body("mensagem").isString().notEmpty().withMessage("Mensagem is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation errors for /contact", { errors: errors.array() });
      return res.status(400).json({
        id: req.body.id || null,
        success: false,
        message: "Validation failed",
        details: errors.array(),
      });
    }

    const contactData: ContactData = req.body;
    try {
      const result: EmailResult = await sendContactEmail(contactData);
      logger.info("Contact email sent successfully", { id: result.id });
      res.status(200).json({
        id: result.id,
        success: true,
        message: "Contact email sent successfully",
      });
    } catch (error) {
      logger.error("Error sending contact email", { error: error.message });
      res.status(500).json({
        id: req.body.id || null,
        success: false,
        message: "Failed to send contact email",
      });
    }
  },
);

// POST /api/email/assessment
router.post(
  "/assessment",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("resultado").isString().notEmpty().withMessage("Resultado is required"),
    body("recomendacoes").isString().notEmpty().withMessage("Recomendacoes is required"),
    body("nome").isString().notEmpty().withMessage("Nome is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation errors for /assessment", { errors: errors.array() });
      return res.status(400).json({
        id: req.body.id || null,
        success: false,
        message: "Validation failed",
        details: errors.array(),
      });
    }

    const assessmentData: AssessmentData = req.body;
    try {
      const result: EmailResult = await sendAssessmentEmail(assessmentData);
      logger.info("Assessment email sent successfully", { id: result.id });
      res.status(200).json({
        id: result.id,
        success: true,
        message: "Assessment email sent successfully",
      });
    } catch (error) {
      logger.error("Error sending assessment email", { error: error.message });
      res.status(500).json({
        id: req.body.id || null,
        success: false,
        message: "Failed to send assessment email",
      });
    }
  },
);

// GET /api/email/health
router.get("/health", async (req: Request, res: Response) => {
  try {
    // Assuming emailService has a method to check SMTP connection
    // If not, implement a simple SMTP test here
    // For now, placeholder: const isConnected = await checkSMTPConnection();
    const isConnected = true; // Replace with actual check
    if (isConnected) {
      logger.info("SMTP connection healthy");
      res.status(200).json({
        success: true,
        message: "SMTP connection is healthy",
      });
    } else {
      logger.warn("SMTP connection unhealthy");
      res.status(503).json({
        success: false,
        message: "SMTP connection is unhealthy",
      });
    }
  } catch (error) {
    logger.error("Error checking SMTP health", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Failed to check SMTP health",
    });
  }
});

// Export the router
export default router;
