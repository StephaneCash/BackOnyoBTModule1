const viewsController = require('../controllers/viewsController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, viewsController.getAllViews);

router.get('/:id', auth, viewsController.getOneView);

router.post('/', auth, viewsController.addView);

module.exports = router;