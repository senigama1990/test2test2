// Главный файл сервера Express
import express from 'express';
import cors from 'cors';
import { searchRouter } from './routes/search.js';
import { annotationsRouter } from './routes/annotations.js';
import { addRouter } from './routes/add.js';
import { authRouter } from './routes/auth.js';
import { authMiddleware } from './middleware/authMiddleware.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/search', searchRouter);
app.use('/api/annotations', annotationsRouter);
app.use('/api/auth', authRouter);
app.use('/api/add', authMiddleware('admin'), addRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
