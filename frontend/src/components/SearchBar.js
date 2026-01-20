import React from 'react';

// Форма поиска с выбором языка
export default function SearchBar({
  query,
  language,
  languages,
  onQueryChange,
  onLanguageChange,
  onSubmit
}) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Введите слово для поиска"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <select
        className="search-bar__select"
        value={language}
        onChange={(event) => onLanguageChange(event.target.value)}
      >
        {languages.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
      <button className="search-bar__button" type="submit">
        Найти
      </button>
    </form>
  );
}
