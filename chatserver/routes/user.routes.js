const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const { UserControllers } = require("./../controllers/user.controller")


router.post('/login', UserControllers.login);

router.post('/logout', UserControllers.logout);

router.get('/:email', UserControllers.userInfo)

router.get('/profile', verifyToken, UserControllers.getProfile)

module.exports = router 