const generateController = require('../controllers/generateController.js');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, generateController.getAllCodes);

router.get('/:id', auth, generateController.getOneCode);

router.post('/', generateController.addGenerate);

router.delete('/:id', auth, generateController.deleteCode);

router.delete('/', auth, generateController.viderCode)

module.exports = router;