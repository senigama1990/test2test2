import React, { useState } from 'react';
import { addWord, exportData } from '../services/api.js';

// Админ-панель для добавления слова и экспорта данных
export default function AdminPanel() {
  const [formData, setFormData] = useState({
    id: '',
    word: '',
    language: 'ru',
    definition: '',
    hypernyms: '',
    hyponyms: ''
  });
  const [status, setStatus] = useState('');
  const [exportResult, setExportResult] = useState(null);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    const payload = {
      id: formData.id,
      word: formData.word,
      language: formData.language,
      definition: formData.definition,
      hypernyms: formData.hypernyms
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      hyponyms: formData.hyponyms
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    };
    const result = await addWord(payload);
    setStatus(result.error ? `Ошибка: ${result.error}` : 'Слово добавлено');
  };

  const handleExport = async () => {
    const result = await exportData(formData.language);
    setExportResult(result);
  };

  return (
    <div className="admin-panel">
      <h2>Админ-панель</h2>
      <form className="admin-panel__form" onSubmit={handleSubmit}>
        <label>
          Язык
          <select
            value={formData.language}
            onChange={handleChange('language')}
          >
            <option value="ru">Русский</option>
            <option value="uz">Узбекский</option>
          </select>
        </label>
        <label>
          ID
          <input value={formData.id} onChange={handleChange('id')} />
        </label>
        <label>
          Слово
          <input value={formData.word} onChange={handleChange('word')} />
        </label>
        <label>
          Определение
          <textarea
            value={formData.definition}
            onChange={handleChange('definition')}
          />
        </label>
        <label>
          Гиперонимы (через запятую)
          <input
            value={formData.hypernyms}
            onChange={handleChange('hypernyms')}
          />
        </label>
        <label>
          Гипонимы (через запятую)
          <input
            value={formData.hyponyms}
            onChange={handleChange('hyponyms')}
          />
        </label>
        <button type="submit">Добавить</button>
      </form>
      {status && <p className="admin-panel__status">{status}</p>}
      <div className="admin-panel__export">
        <button type="button" onClick={handleExport}>
          Экспортировать JSON
        </button>
        {exportResult && (
          <pre className="admin-panel__output">
            {JSON.stringify(exportResult, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
