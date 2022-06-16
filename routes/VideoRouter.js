const videoController = require('../controllers/videoController');
const auth = require('../auth/auth');

const router = require('express').Router();

router.get('/', auth, videoController.getAllVideos);

router.get('/:id', auth, videoController.getOneVideo);

router.get('/v1/users-streaming', auth, videoController.getAllVideosAndUserBoutique);

router.post('/', auth, videoController.addVideo);

router.delete('/:id', auth, videoController.deleteVideo);

router.put('/:id', auth, videoController.updateVideo);

module.exports = router;