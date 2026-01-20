import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar.js';
import WordCard from '../components/WordCard.js';
import GraphView from '../components/GraphView.js';
import { fetchLanguages, fetchTree, searchWord } from '../services/api.js';

// Страница результатов поиска
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [language, setLanguage] = useState(searchParams.get('lang') ?? 'both');
  const [languages, setLanguages] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [tree, setTree] = useState(null);

  useEffect(() => {
    const loadLanguages = async () => {
      const data = await fetchLanguages();
      setLanguages(data.languages ?? []);
    };
    loadLanguages();
  }, []);

  useEffect(() => {
    const loadResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const data = await searchWord(query, language);
      setResults(data.results ?? []);
    };
    loadResults();
  }, [query, language]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ q: query, lang: language });
  };

  const handleSelect = async (word) => {
    setSelectedWord(word);
    const data = await fetchTree(word.id);
    setTree(data);
  };

  return (
    <div className="page page--search">
      <SearchBar
        query={query}
        language={language}
        languages={languages}
        onQueryChange={setQuery}
        onLanguageChange={setLanguage}
        onSubmit={handleSubmit}
      />
      <div className="search-layout">
        <aside className="search-layout__results">
          <h2>Результаты</h2>
          {results.length === 0 && <p>Нет результатов.</p>}
          <ul>
            {results.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="result-button"
                >
                  {item.word} ({item.language})
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className="search-layout__content">
          <WordCard word={selectedWord} />
          <GraphView tree={tree} />
        </section>
      </div>
    </div>
  );
}
