import React, { useState } from 'react';
import ResultTable from './ResultTable.js';

export default function SearchPage() {
  const [word, setWord] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/search?word=${encodeURIComponent(word)}`);
    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <div>
      <h1>Поиск</h1>
      <form onSubmit={handleSearch}>
        <input value={word} onChange={(e) => setWord(e.target.value)} placeholder="Введите слово" />
        <button type="submit">Искать</button>
      </form>
      <ResultTable results={results} />
    </div>
  );
}
