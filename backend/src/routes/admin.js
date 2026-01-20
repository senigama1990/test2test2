// Маршруты для административного управления данными
import express from 'express';
import { loadLanguageData, saveLanguageData } from '../utils/dataHelpers.js';

export const adminRouter = express.Router();

// Добавление нового слова
adminRouter.post('/word', async (req, res) => {
  const payload = req.body;
  if (!payload?.language || !payload?.id || !payload?.word) {
    return res.status(400).json({ error: 'Нужны поля language, id и word' });
  }

  const data = await loadLanguageData(payload.language);
  if (!data) {
    return res.status(400).json({ error: 'Неизвестный язык' });
  }

  const exists = data.words.some((item) => item.id === payload.id);
  if (exists) {
    return res.status(409).json({ error: 'Слово с таким id уже существует' });
  }

  data.words.push(payload);
  data.metadata.totalWords = data.words.length;
  data.metadata.lastUpdated = new Date().toISOString().slice(0, 10);

  await saveLanguageData(payload.language, data);
  return res.status(201).json({ status: 'ok' });
});

// Редактирование слова
adminRouter.put('/word/:id', async (req, res) => {
  const language = req.body?.language;
  if (!language) {
    return res.status(400).json({ error: 'Нужен язык записи' });
  }
  const data = await loadLanguageData(language);
  if (!data) {
    return res.status(400).json({ error: 'Неизвестный язык' });
  }
  const index = data.words.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Слово не найдено' });
  }

  data.words[index] = { ...data.words[index], ...req.body };
  data.metadata.lastUpdated = new Date().toISOString().slice(0, 10);
  await saveLanguageData(language, data);

  return res.json({ status: 'ok' });
});

// Удаление слова
adminRouter.delete('/word/:id', async (req, res) => {
  const language = req.query.lang?.toString();
  if (!language) {
    return res.status(400).json({ error: 'Нужен параметр lang' });
  }
  const data = await loadLanguageData(language);
  if (!data) {
    return res.status(400).json({ error: 'Неизвестный язык' });
  }
  const nextWords = data.words.filter((item) => item.id !== req.params.id);
  if (nextWords.length === data.words.length) {
    return res.status(404).json({ error: 'Слово не найдено' });
  }
  data.words = nextWords;
  data.metadata.totalWords = data.words.length;
  data.metadata.lastUpdated = new Date().toISOString().slice(0, 10);
  await saveLanguageData(language, data);
  return res.json({ status: 'ok' });
});

// Импорт JSON
adminRouter.post('/import', async (req, res) => {
  const { language, payload } = req.body ?? {};
  if (!language || !payload?.words) {
    return res.status(400).json({ error: 'Нужны language и payload' });
  }
  const saved = await saveLanguageData(language, payload);
  if (!saved) {
    return res.status(400).json({ error: 'Неизвестный язык' });
  }
  return res.json({ status: 'ok' });
});

// Экспорт JSON
adminRouter.get('/export', async (req, res) => {
  const language = req.query.lang?.toString();
  if (!language) {
    return res.status(400).json({ error: 'Нужен параметр lang' });
  }
  const data = await loadLanguageData(language);
  if (!data) {
    return res.status(400).json({ error: 'Неизвестный язык' });
  }
  return res.json(data);
});
