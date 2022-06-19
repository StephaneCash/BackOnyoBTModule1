const priceController = require('../controllers/priceController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, priceController.getAllPrix);

router.post('/', auth, priceController.addPrix);

router.delete('/:id', auth, priceController.deletePrix);

router.put('/:id', auth, priceController.updatePrix);

module.exports = router;