const express = require('express');
const router = express.Router();
const { verificarToken, redirectIfAuthenticated } = require('../middlewares/authMiddleware');
const linkController = require('../controllers/linkController');

// Rota do Dashboard (Protegida)
router.get('/dashboard', verificarToken, (req, res) => {
    res.render('dashboard'); 
});

// Rotas de Autenticação (Públicas)
router.get('/login', redirectIfAuthenticated, (req, res) => {
    res.render('auth/login'); 
});

router.get('/register', redirectIfAuthenticated, (req, res) => {
    res.render('auth/register');
});

router.get('/:code', linkController.redirecionarLink);

module.exports = router;