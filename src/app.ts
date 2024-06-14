import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path'; // Certifique-se de importar 'path'
import { authRoutes } from './routes/authRoutes'; // Verifique se o caminho está correto
import { router as itemRoutes } from './routes/itemRoutes'; // Verifique se o caminho está correto
import upload from './middlewares/multer'; // Verifique se o caminho está correto

const app = express();

app.use(express.json());
app.use(cors());

// Middleware para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(authRoutes);
app.use('/api', itemRoutes);

// Middleware de erro global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro:', err);
  res.status(500).json({ message: 'Erro interno no servidor' });
});

export { app };
