const {Router} = require('express');
const { postCart, getCart } = require('../controllers/cart.controller');

const router = Router();

// => ( /api/carrito )

router.post('/', postCart);

router.get('/', getCart);

module.exports = router;