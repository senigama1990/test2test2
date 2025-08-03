import React, { useState } from 'react';

export default function AdminPanel() {
  const [uz, setUz] = useState('');
  const [ru, setRu] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'admin' },
      body: JSON.stringify({ uz_sentence: uz, ru_sentence: ru, annotations: [] })
    });
    setUz('');
    setRu('');
  };

  return (
    <div>
      <h1>Добавить текст</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={uz} onChange={(e) => setUz(e.target.value)} placeholder="Узбекское предложение" />
        <textarea value={ru} onChange={(e) => setRu(e.target.value)} placeholder="Русское предложение" />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}
