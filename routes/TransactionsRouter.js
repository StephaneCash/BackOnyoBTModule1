const transactionController = require('../controllers/transactionController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, transactionController.getAllTransactions);

router.get('/:id', auth, transactionController.getOneTransaction);

router.get('/v1/categories', auth, transactionController.getAllTransactionsAndCategories);

router.get('/v1/users', auth, transactionController.getAllTransactionsUsers);

router.get('/v1/partenaires', auth, transactionController.getPartenairesTransactions);

router.post('/', auth, transactionController.addTransaction);

router.delete('/:id', auth, transactionController.deleteTransaction);

router.put('/:id', auth, transactionController.updateTransaction);

module.exports = router;