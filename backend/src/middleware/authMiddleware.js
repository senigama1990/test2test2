// Простая проверка роли по заголовку Authorization
export function authMiddleware(requiredRole) {
  return (req, res, next) => {
    const role = req.headers['authorization'];
    if (!role) return res.status(401).json({ message: 'Нет авторизации' });
    if (requiredRole && role !== requiredRole) {
      return res.status(403).json({ message: 'Недостаточно прав' });
    }
    req.role = role;
    next();
  };
}
