import React from 'react';

// Карточка выбранного слова
export default function WordCard({ word }) {
  if (!word) {
    return (
      <div className="word-card word-card--empty">
        Выберите слово из списка результатов
      </div>
    );
  }

  return (
    <div className="word-card">
      <h2 className="word-card__title">{word.word}</h2>
      <p className="word-card__meta">Язык: {word.language}</p>
      {word.translation && (
        <p className="word-card__meta">
          Перевод: {Object.values(word.translation).join(', ')}
        </p>
      )}
      {word.definition && (
        <p className="word-card__definition">{word.definition}</p>
      )}
      <div className="word-card__lists">
        <div>
          <strong>Гиперонимы:</strong>
          <ul>
            {(word.hypernyms ?? []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Гипонимы:</strong>
          <ul>
            {(word.hyponyms ?? []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
