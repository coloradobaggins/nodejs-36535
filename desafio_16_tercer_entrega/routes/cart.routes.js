const {Router} = require('express');
const {checkAuthentication} = require('../middlewares/checkAuthentication');
const { postCart, getCart } = require('../controllers/cart.controller');

const router = Router();

// => ( /api/carrito )

router.post('/', postCart);

router.get('/', checkAuthentication, getCart);

module.exports = router;