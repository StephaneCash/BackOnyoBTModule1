const codesCopiesController = require('../controllers/codesCopiesController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, codesCopiesController.getAllCodes);

router.get('/:id', auth, codesCopiesController.getOneCode);

router.delete('/', auth, codesCopiesController.deleteCode);

module.exports = router;