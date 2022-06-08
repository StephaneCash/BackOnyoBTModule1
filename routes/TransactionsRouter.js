const transactionController = require('../controllers/transactionController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/all', auth, transactionController.getAllTransactions);

router.get('/:id', auth, transactionController.getOneTransaction);

router.post('/add', auth, transactionController.addTransaction);

router.delete('/:id', auth, transactionController.deleteTransaction);

router.put('/:id', auth, transactionController.updateTransaction);

module.exports = router;