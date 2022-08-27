const { Router } = require('express');
const {checkAuthentication} = require('../middlewares/checkAuthentication');
const { checkUserRol } = require('../middlewares/checkUserRol');
const { getDashboard } = require('../controllers/dashboard.controller');

const router = Router();

router.get('/', checkAuthentication, checkUserRol, getDashboard);



module.exports = router;