import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar.js';
import { fetchLanguages } from '../services/api.js';

// Главная страница с поисковой строкой
export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('both');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const loadLanguages = async () => {
      const data = await fetchLanguages();
      setLanguages(data.languages ?? []);
    };
    loadLanguages();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }
    navigate(`/search?q=${encodeURIComponent(query)}&lang=${language}`);
  };

  return (
    <div className="page page--home">
      <div className="hero">
        <h1>HyperLex</h1>
        <p>
          Веб-платформа для анализа гиперонимо-гипонимических отношений в русском
          и узбекском языках.
        </p>
        <SearchBar
          query={query}
          language={language}
          languages={languages}
          onQueryChange={setQuery}
          onLanguageChange={setLanguage}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
