const express = require('express');
const router = express.Router();

const linkController = require('../controllers/linkController');
const { verificarToken } = require('../middlewares/authMiddleware');
const { validateParams } = require('../middlewares/validateMiddleware');
const { idParamSchema } = require('../validators/paramsSchema');

router.post('/encurtar', verificarToken, linkController.encurtarLink);
router.get('/listar', verificarToken, linkController.listLinks);
router.delete('/:id', verificarToken, validateParams(idParamSchema), linkController.deleteLink);

module.exports = router;