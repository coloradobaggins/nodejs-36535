const { Router } = require('express');
const { checkAuthentication } = require('../middlewares/checkAuthentication');
const { getInfo } = require('../controllers/info.controller');
const compression = require('compression');

const router = Router();

//router.get('/', checkAuthentication, getInfo);    // (Sin compresion)
router.get('/', checkAuthentication, compression({level: 9}), getInfo);



module.exports = router;