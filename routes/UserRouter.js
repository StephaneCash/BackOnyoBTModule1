const userController = require('../controllers/userController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, userController.getAllUsers);

router.get('/:id', auth, userController.getOneUser);

router.get('/v1/transactions', auth, userController.getAllUsersAndTransactions);

router.post('/', userController.addUser);

router.delete('/:id', auth, userController.deleteUser);

router.put('/:id', auth, userController.updateUser);

module.exports = router;