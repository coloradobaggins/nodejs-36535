const {Router} = require('express');
const {checkAuthentication} = require('../middlewares/checkAuthentication');
const {postCheckout, getCheckout} = require('../controllers/checkout.controller');

const router = Router();

// => ( /api/carrito )

router.post('/', postCheckout);

router.get('/', checkAuthentication, getCheckout);


module.exports = router;