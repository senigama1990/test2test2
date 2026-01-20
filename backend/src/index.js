// Главный файл сервера Express для HyperLex
import express from 'express';
import cors from 'cors';
import { wordsRouter } from './routes/words.js';
import { adminRouter } from './routes/admin.js';

const app = express();
app.use(cors());
app.use(express.json());

// Основные маршруты для пользовательского поиска
app.use('/api', wordsRouter);
// Админ-маршруты для управления данными
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер HyperLex запущен на порту ${PORT}`);
});
