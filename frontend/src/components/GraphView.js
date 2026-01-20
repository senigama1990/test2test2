import React from 'react';

const renderTree = (nodes) => {
  if (!nodes || nodes.length === 0) {
    return <p className="graph-view__empty">Нет данных</p>;
  }
  return (
    <ul className="graph-view__list">
      {nodes.map((node) => (
        <li key={node.id}>
          <span>{node.word}</span>
          {node.children && node.children.length > 0 && renderTree(node.children)}
        </li>
      ))}
    </ul>
  );
};

// Временный компонент графа на базе списков
export default function GraphView({ tree }) {
  if (!tree) {
    return (
      <div className="graph-view graph-view--empty">
        Выберите слово, чтобы увидеть дерево
      </div>
    );
  }

  return (
    <div className="graph-view">
      <div className="graph-view__section">
        <h3>Гиперонимы</h3>
        {renderTree(tree.hypernyms)}
      </div>
      <div className="graph-view__section">
        <h3>Гипонимы</h3>
        {renderTree(tree.hyponyms)}
      </div>
    </div>
  );
}
