// Эндпоинт поиска по корпусу
import { Router } from 'express';
export const searchRouter = Router();

// В реальном приложении здесь будет запрос к БД
searchRouter.get('/', async (req, res) => {
  const { word } = req.query;
  // Заглушка данных
  const results = [
    {
      id: 1,
      uz: [
        { text: 'U', type: 'search' },
        { text: ' ', type: 'plain' },
        { text: 'bir nimadan quruq qolganday', type: 'idiom', explanation: 'торопился' },
        { text: ' ', type: 'plain' },
        { text: 'dasturxonga', type: 'realia', explanation: 'скатерть' },
        { text: ' yopishdi.', type: 'plain' }
      ],
      ru: [
        { text: 'Он', type: 'search' },
        { text: ' вцепился в стол, ', type: 'plain' },
        { text: 'как будто его что-то укусило', type: 'idiom', explanation: 'торопился' },
        { text: '.', type: 'plain' }
      ]
    }
  ];
  res.json({ word, results });
});
