import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailRoutes from './routes/email';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://financeit.com.br']
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/email', emailRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
