const express = require('express');
const router = express.Router();
const { ChatControllers } = require("./../controllers/chat.controller");
const verifyToken = require('../middlewares/auth.middleware');

router.post('/sendMessage', verifyToken, ChatControllers.sendMessage)
router.get('/getMyMessages', verifyToken, ChatControllers.getMyMessages)
router.get('/getSingleMessageThread', verifyToken, ChatControllers.getSingleMessageThread)

module.exports = router 