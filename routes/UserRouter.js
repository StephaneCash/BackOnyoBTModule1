const userController = require('../controllers/userController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/all', auth, userController.getAllUsers);

router.get('/:id', auth, userController.getOneUser);

router.post('/add', userController.addUser);

router.delete('/:id', auth, userController.deleteUser);

router.put('/:id', auth, userController.updateUser);

module.exports = router;