const conferenceController = require('../controllers/conferencesController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, conferenceController.getAllConference);

router.get('/:id', auth, conferenceController.getOneConference);

router.post('/', auth, conferenceController.addConference);

router.delete('/:id', auth, conferenceController.deleteConference);

router.put('/:id', auth, conferenceController.updateVideoConference);

module.exports = router;