// Подключение к базе данных PostgreSQL
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'password',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  database: process.env.PGDATABASE || 'corpus'
});
