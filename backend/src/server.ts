import * as dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/email';


const transporter: nodemailer.Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export { transporter };

transporter.verify((error: Error | null, success: boolean) => {
  if (error) {
    console.log('SMTP connection failed:', error);
  } else {
    console.log('SMTP connection successful');
  }
});

const app: express.Application = express();

const corsOptions: cors.CorsOptions = {
  origin: process.env.CORS_ORIGINS?.split(','),
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/email', emailRoutes);

app.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'OK' });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT: string | number = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});