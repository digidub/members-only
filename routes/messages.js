const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.use('/', messageController.checkAuthorised);
router.get('/', messageController.index);
router.get('/post', messageController.postMessageGet);
router.post('/post', messageController.postMessagePost);

module.exports = router;
