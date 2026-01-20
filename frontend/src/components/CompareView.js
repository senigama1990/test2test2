import React from 'react';
import GraphView from './GraphView.js';

// Сравнительное отображение двух деревьев
export default function CompareView({ compareData }) {
  if (!compareData) {
    return (
      <div className="compare-view compare-view--empty">
        Заполните идентификаторы слов для сравнения
      </div>
    );
  }

  return (
    <div className="compare-view">
      <div className="compare-view__column">
        <h3>Русский</h3>
        <GraphView tree={compareData.ru} />
      </div>
      <div className="compare-view__column">
        <h3>Узбекский</h3>
        <GraphView tree={compareData.uz} />
      </div>
    </div>
  );
}
