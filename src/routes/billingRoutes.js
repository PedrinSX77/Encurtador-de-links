const express = require('express');
const router = express.Router();
const {verificarToken} = require('../middlewares/authMiddleware');
const billingController = require('../controllers/billingController');

router.post('/vip/checkout', verificarToken, billingController.createCheckoutSession);

module.exports = router;