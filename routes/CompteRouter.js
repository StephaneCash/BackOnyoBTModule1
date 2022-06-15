const compteController = require('../controllers/compteController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, compteController.getAllComptes);

router.get('/:id', auth, compteController.getOneCompte);

router.get('/v1/partenaires', auth, compteController.getAllComptesAndPartenaires);

router.post('/', auth, compteController.addCompte);

router.delete('/:id', auth, compteController.deleteCompte);

router.put('/:id', auth, compteController.updateCompte);

module.exports = router;