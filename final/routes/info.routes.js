const { Router } = require('express');
const { checkAuthentication, checkAdminRol } = require('../middlewares/');
const { getInfo } = require('../controllers/info.controller');
const compression = require('compression');

const router = Router();

//router.get('/', checkAuthentication, getInfo);    // (Sin compresion)
router.get('/', [ checkAuthentication, checkAdminRol ], compression({level: 9}), getInfo);



module.exports = router;