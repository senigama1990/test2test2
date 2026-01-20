// Маршруты для поиска слов и построения деревьев
import express from 'express';
import {
  buildTree,
  buildWordsIndex,
  collectLanguages,
  getWordById,
  loadAllWords
} from '../utils/dataHelpers.js';

export const wordsRouter = express.Router();

// Поиск слова по запросу и языку
wordsRouter.get('/search', async (req, res) => {
  const query = (req.query.q ?? '').toString().trim().toLowerCase();
  const language = (req.query.lang ?? 'both').toString();

  if (!query) {
    return res.status(400).json({ error: 'Запрос не может быть пустым' });
  }

  const allWords = await loadAllWords();
  const filteredWords = [];

  const shouldInclude = (lang) => language === 'both' || language === lang;

  if (shouldInclude('ru')) {
    filteredWords.push(
      ...allWords.ru.filter((word) => word.word.toLowerCase().includes(query))
    );
  }
  if (shouldInclude('uz')) {
    filteredWords.push(
      ...allWords.uz.filter((word) => word.word.toLowerCase().includes(query))
    );
  }

  return res.json({ results: filteredWords });
});

// Получение слова по идентификатору
wordsRouter.get('/word/:id', async (req, res) => {
  const word = await getWordById(req.params.id);
  if (!word) {
    return res.status(404).json({ error: 'Слово не найдено' });
  }
  return res.json(word);
});

// Получение дерева гиперонимов и гипонимов
wordsRouter.get('/word/:id/tree', async (req, res) => {
  const depth = Number.parseInt(req.query.depth ?? '3', 10);
  const word = await getWordById(req.params.id);
  if (!word) {
    return res.status(404).json({ error: 'Слово не найдено' });
  }

  const allWords = await loadAllWords();
  const wordsIndex = buildWordsIndex([...allWords.ru, ...allWords.uz]);

  const hypernyms = buildTree(word.id, 'hypernyms', depth, wordsIndex);
  const hyponyms = buildTree(word.id, 'hyponyms', depth, wordsIndex);

  return res.json({
    root: word,
    hypernyms,
    hyponyms
  });
});

// Сравнение русского и узбекского слов
wordsRouter.get('/compare', async (req, res) => {
  const ruId = req.query.ru?.toString();
  const uzId = req.query.uz?.toString();
  if (!ruId || !uzId) {
    return res.status(400).json({ error: 'Нужны параметры ru и uz' });
  }

  const allWords = await loadAllWords();
  const wordsIndex = buildWordsIndex([...allWords.ru, ...allWords.uz]);

  const ruWord = wordsIndex.get(ruId);
  const uzWord = wordsIndex.get(uzId);

  if (!ruWord || !uzWord) {
    return res.status(404).json({ error: 'Слова не найдены' });
  }

  return res.json({
    ru: {
      root: ruWord,
      hypernyms: buildTree(ruWord.id, 'hypernyms', 3, wordsIndex),
      hyponyms: buildTree(ruWord.id, 'hyponyms', 3, wordsIndex)
    },
    uz: {
      root: uzWord,
      hypernyms: buildTree(uzWord.id, 'hypernyms', 3, wordsIndex),
      hyponyms: buildTree(uzWord.id, 'hyponyms', 3, wordsIndex)
    }
  });
});

// Получение списка языков
wordsRouter.get('/languages', (req, res) => {
  return res.json({ languages: collectLanguages() });
});
