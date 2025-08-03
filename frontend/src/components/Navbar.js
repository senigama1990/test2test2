import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ role }) {
  return (
    <nav>
      <Link to="/">Главная</Link> |{' '}
      <Link to="/search">Поиск</Link> |{' '}
      <Link to="/auth">Вход</Link>
      {role === 'admin' && (
        <> | <Link to="/add">Добавить текст</Link></>
      )}
    </nav>
  );
}
