const { Router } = require('express');
const {checkAuthentication} = require('../middlewares/checkAuthentication');
const { getDashboard } = require('../controllers/dashboard.controller');

const router = Router();

router.get('/', checkAuthentication, getDashboard);



module.exports = router;