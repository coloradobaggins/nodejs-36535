const { Router} = require('express');
const { getRandoms } = require('../controllers/randoms.controller');
const { checkAuthentication } = require('../middlewares/checkAuthentication');

const router = new Router();

router.get('/', checkAuthentication, getRandoms);

module.exports = router;