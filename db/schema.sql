-- Схема базы данных PostgreSQL для параллельного корпуса

-- Пользователи
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL
);

-- Аннотированные предложения
CREATE TABLE corpus (
    id SERIAL PRIMARY KEY,
    uz_sentence TEXT NOT NULL,
    ru_sentence TEXT NOT NULL
);

-- Аннотации
CREATE TABLE annotations (
    id SERIAL PRIMARY KEY,
    corpus_id INTEGER REFERENCES corpus(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    span_start INTEGER NOT NULL,
    span_end INTEGER NOT NULL,
    phrase TEXT NOT NULL,
    explanation TEXT,
    lang TEXT NOT NULL
);

