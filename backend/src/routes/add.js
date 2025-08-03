// Добавление новых пар предложений (только для администратора)
import { Router } from 'express';
export const addRouter = Router();

addRouter.post('/', async (req, res) => {
  // Здесь будет вставка в БД
  const { uz_sentence, ru_sentence, annotations } = req.body;
  // Возвращаем заглушку
  res.json({ message: 'Пара добавлена', uz_sentence, ru_sentence, annotations });
});
