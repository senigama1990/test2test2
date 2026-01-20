import React, { useState } from 'react';
import CompareView from '../components/CompareView.js';
import { compareWords } from '../services/api.js';

// Страница сравнения двух слов
export default function Compare() {
  const [ruId, setRuId] = useState('');
  const [uzId, setUzId] = useState('');
  const [compareData, setCompareData] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    const data = await compareWords(ruId, uzId);
    if (data.error) {
      setStatus(data.error);
      setCompareData(null);
      return;
    }
    setCompareData(data);
  };

  return (
    <div className="page page--compare">
      <h2>Сравнительный режим</h2>
      <form className="compare-form" onSubmit={handleSubmit}>
        <input
          placeholder="ID русского слова (например, ru_001)"
          value={ruId}
          onChange={(event) => setRuId(event.target.value)}
        />
        <input
          placeholder="ID узбекского слова (например, uz_001)"
          value={uzId}
          onChange={(event) => setUzId(event.target.value)}
        />
        <button type="submit">Сравнить</button>
      </form>
      {status && <p className="status">{status}</p>}
      <CompareView compareData={compareData} />
    </div>
  );
}
