const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
    const authHeader = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
    if (!authHeader) {
        if(req.accepts('html')) {
            return res.redirect('/login');
        }
        return res.status(401).json({ error: "Não autorizado. Faça login." });
    }

    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.clearCookie('token');
        if(req.accepts('html')) {
            return res.redirect('/login');
        }
        return res.status(403).json({ error: "Token inválido." });
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