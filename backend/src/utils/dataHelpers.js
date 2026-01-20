// Утилиты для работы с JSON-файлами данных
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.resolve(__dirname, '..', '..', 'data');

const languageFiles = {
  ru: 'russian.json',
  uz: 'uzbek.json'
};

const getLanguageFilePath = (language) => {
  const fileName = languageFiles[language];
  if (!fileName) {
    return null;
  }
  return path.join(dataDirectory, fileName);
};

export const loadLanguageData = async (language) => {
  const filePath = getLanguageFilePath(language);
  if (!filePath) {
    return null;
  }
  const rawContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(rawContent);
};

export const saveLanguageData = async (language, payload) => {
  const filePath = getLanguageFilePath(language);
  if (!filePath) {
    return false;
  }
  const serialized = JSON.stringify(payload, null, 2);
  await fs.writeFile(filePath, serialized, 'utf-8');
  return true;
};

export const loadAllWords = async () => {
  const [ruData, uzData] = await Promise.all([
    loadLanguageData('ru'),
    loadLanguageData('uz')
  ]);
  return {
    ru: ruData?.words ?? [],
    uz: uzData?.words ?? []
  };
};

export const buildWordsIndex = (words) => {
  const index = new Map();
  words.forEach((word) => {
    index.set(word.id, word);
  });
  return index;
};

export const getWordById = async (id) => {
  if (!id) {
    return null;
  }
  const language = id.startsWith('ru_') ? 'ru' : id.startsWith('uz_') ? 'uz' : null;
  if (!language) {
    return null;
  }
  const data = await loadLanguageData(language);
  if (!data) {
    return null;
  }
  return data.words.find((word) => word.id === id) ?? null;
};

export const buildTree = (wordId, relation, depth, wordsIndex, visited = new Set()) => {
  if (!wordId || depth <= 0 || visited.has(wordId)) {
    return [];
  }
  const word = wordsIndex.get(wordId);
  if (!word) {
    return [];
  }
  visited.add(wordId);
  const relatedIds = word[relation] ?? [];
  return relatedIds
    .map((relatedId) => {
      const relatedWord = wordsIndex.get(relatedId);
      if (!relatedWord) {
        return null;
      }
      return {
        id: relatedWord.id,
        word: relatedWord.word,
        language: relatedWord.language,
        translation: relatedWord.translation ?? {},
        definition: relatedWord.definition ?? '',
        children: buildTree(relatedWord.id, relation, depth - 1, wordsIndex, visited)
      };
    })
    .filter(Boolean);
};

export const collectLanguages = () => [
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: 'Узбекский' },
  { code: 'both', label: 'Сравнение' }
];
