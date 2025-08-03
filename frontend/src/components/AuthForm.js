import React, { useState } from 'react';

export default function AuthForm({ setRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const data = await res.json();
      setRole(data.role);
    } else {
      setError('Ошибка авторизации');
    }
  };

  return (
    <div>
      <h1>Вход</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Логин" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
