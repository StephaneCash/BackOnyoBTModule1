const userController = require('../controllers/userController');

const router = require('express').Router();

router.get('/all', userController.getAllUsers);

router.get('/:id', userController.getOneUser);

router.post('/add', userController.addUser);

router.delete('/:id', userController.deleteUser);

router.put('/:id', userController.updateUser);

module.exports = router;