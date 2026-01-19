const authController = require('../controllers/authController');
const express = require('express');
const { validate } = require('../middlewares/validateMiddleware');
const { loginSchema, registerSchema } = require('../validators/authSchema');
const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);

module.exports = router;