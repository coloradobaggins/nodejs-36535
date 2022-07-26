const { Router } = require('express');
const { checkAuthentication } = require('../middlewares/checkAuthentication');
const { getInfo } = require('../controllers/info.controller');

const router = Router();

router.get('/', checkAuthentication, getInfo);


module.exports = router;