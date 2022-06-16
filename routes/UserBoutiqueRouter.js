const userBoutiqueController = require('../controllers/userBoutiqueController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, userBoutiqueController.getAllUsersBoutiques);

router.get('/:id', auth, userBoutiqueController.getOneUserBoutique);

router.get('/v1/users', auth, userBoutiqueController.getAllUsersBoutiquesAndUsers);

router.post('/', userBoutiqueController.addUserBoutique);

router.delete('/:id', auth, userBoutiqueController.deleteUserBoutique);

router.put('/:id', auth, userBoutiqueController.updateUserBoutique);

module.exports = router;