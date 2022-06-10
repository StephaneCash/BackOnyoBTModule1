const categorieController = require('../controllers/categorieController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, categorieController.getAllCategory);

router.get('/:id', auth, categorieController.getOneCategory);

router.get('/v1/transactions', auth, categorieController.getCategoryAndTransactions);

router.post('/', auth, categorieController.addCategorie);

router.delete('/:id', auth, categorieController.deleteCategory);

router.put('/:id', auth, categorieController.updateCategory);

module.exports = router;