import React from 'react';
import { NavLink } from 'react-router-dom';

// Верхняя панель навигации проекта
export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">HyperLex</span>
        <span className="header__subtitle">
          Платформа анализа гиперонимов и гипонимов
        </span>
      </div>
      <nav className="header__nav">
        <NavLink to="/" className="header__link">
          Главная
        </NavLink>
        <NavLink to="/search" className="header__link">
          Поиск
        </NavLink>
        <NavLink to="/compare" className="header__link">
          Сравнение
        </NavLink>
        <NavLink to="/admin" className="header__link">
          Админ
        </NavLink>
      </nav>
    </header>
  );
}
