// Простая авторизация
import { Router } from 'express';
import bcrypt from 'bcrypt';
export const authRouter = Router();

// В реальном приложении данные берутся из БД
const users = [
  { id: 1, username: 'senigama', password: bcrypt.hashSync('fara9099', 10), role: 'admin' }
];

authRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Неверные данные' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Неверные данные' });
  res.json({ username: user.username, role: user.role });
});
