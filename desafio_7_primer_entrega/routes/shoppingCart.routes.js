const { Router } = require('express');
const { getShoppingCart } = require('../controllers/shoppingCart.controller');

const router = Router();

router.get('/', getShoppingCart);

module.exports = router;