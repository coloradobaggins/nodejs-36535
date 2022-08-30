const { Router } = require('express');
const { checkAuthentication } = require('../middlewares/');
const { getChat } = require('../controllers/chat.controller');

const router = Router();

router.get('/', checkAuthentication, getChat);


module.exports = router;