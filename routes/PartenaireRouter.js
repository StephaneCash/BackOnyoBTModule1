const partenaireController = require('../controllers/partenaireController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, partenaireController.getAllPartenaires);

router.get('/:id', auth, partenaireController.getOnePartenaire);

router.get('/v1/categories', auth, partenaireController.getPartenairesAndCategories);

router.post('/', auth, partenaireController.addPartenaire);

router.delete('/:id', auth, partenaireController.deletePartenaire);

router.put('/:id', auth, partenaireController.updatePartenaire);

module.exports = router;