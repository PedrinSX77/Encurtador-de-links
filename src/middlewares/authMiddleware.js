const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
  const tokenFromCookie = req.cookies?.token;
  const tokenFromHeader = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;

  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    console.log('=> BLOCK: no token');
    if (req.accepts('html')) return res.redirect('/login');
    return res.status(401).json({ error: 'Não autorizado. Faça login.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    console.log('=> BLOCK: jwt.verify failed:', error.name, error.message);
    res.clearCookie('token', { path: '/' });
    if (req.accepts('html')) return res.redirect('/login');
    return res.status(403).json({ error: 'Token inválido.' });
  }
};

exports.redirectIfAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return res.redirect('/dashboard'); // APENAS UM REDIRECT AQUI
        } catch (error) {
            res.clearCookie('token');
            return next();
        }
    }
    next();
};