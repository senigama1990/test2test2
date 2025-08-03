// Эндпоинт возврата всех аннотаций
import { Router } from 'express';
export const annotationsRouter = Router();

annotationsRouter.get('/', async (req, res) => {
  // Заглушка
  const data = [
    { id: 1, corpus_id: 1, type: 'realia', phrase: 'dasturxonga', explanation: 'скатерть', lang: 'uz' },
    { id: 2, corpus_id: 1, type: 'idiom', phrase: 'bir nimadan quruq qolganday', explanation: 'торопился', lang: 'uz' }
  ];
  res.json(data);
});
