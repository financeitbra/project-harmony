import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import emailRoutes from "./routes/email.routes";
import { transporter, verifyConnection } from "./config/email";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:5173", "https://financeit.com.br"],
    credentials: true,
  }),
);

// ============================================
// LOGGING
// ============================================

interface LogEntry {
  timestamp: string;
  level: "info" | "error" | "warn";
  message: string;
  data?: any;
}

const log = (level: "info" | "error" | "warn", message: string, data?: any) => {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
  };
  console.log(JSON.stringify(entry));
};

// ============================================
// ROUTES
// ============================================

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Email routes
app.use("/api/email", emailRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
    path: req.path,
  });
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  log("error", "Unhandled error", { message: err.message, stack: err.stack });
  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ============================================
// SERVER INITIALIZATION
// ============================================

const startServer = async () => {
  try {
    // Verify SMTP connection
    log("info", "Verificando conexão SMTP...");
    await verifyConnection();
    log("info", "✅ Conexão SMTP validada com sucesso");

    // Start server
    app.listen(PORT, () => {
      log("info", `🚀 Servidor iniciado na porta ${PORT}`, {
        environment: process.env.NODE_ENV || "development",
        smtpHost: process.env.SMTP_HOST,
        corsOrigins: process.env.CORS_ORIGINS?.split(","),
      });
    });
  } catch (error: any) {
    log("error", "❌ Falha ao iniciar servidor", {
      message: error.message,
      code: error.code,
    });
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  log("error", "Uncaught Exception", { message: error.message, stack: error.stack });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  log("error", "Unhandled Rejection", { reason, promise });
  process.exit(1);
});

startServer();

export default app;
