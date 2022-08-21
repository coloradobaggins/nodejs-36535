const {Router} = require('express');
const {checkAuthentication} = require('../middlewares/checkAuthentication');
const { postCart, getCart, deleteProdFromCart } = require('../controllers/cart.controller');

const router = Router();

// => ( /api/carrito )

router.post('/', postCart);

router.get('/', checkAuthentication, getCart);

router.delete('/:id/producto', deleteProdFromCart);

module.exports = router;