const transactionController = require('../controllers/transactionController');
const auth = require('../auth/auth')

const router = require('express').Router();

router.get('/all', auth, transactionController.getAllTransactions);

router.get('/:id', transactionController.getOneTransaction);

router.post('/add', transactionController.addTransaction);

router.delete('/:id', transactionController.deleteTransaction);

router.put('/:id', transactionController.updateTransaction);

module.exports = router;