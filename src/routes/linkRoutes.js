const express = require('express');
const router = express.Router();

const linkController = require('../controllers/linkController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/encurtar', verificarToken, linkController.encurtarLink);
router.get('/listar', verificarToken, linkController.listLinks);
router.delete('/:id', verificarToken, linkController.deleteLink);

module.exports = router;