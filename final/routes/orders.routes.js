const { Router } = require('express');
const { checkAuthentication, checkAdminRol } = require('../middlewares/');
const { getOrders, getAllOrders } = require('../controllers/orders.controller');

const router = Router();

router.get('/', checkAuthentication, getOrders);

router.get('/all', [checkAuthentication, checkAdminRol], getAllOrders);

module.exports = router;