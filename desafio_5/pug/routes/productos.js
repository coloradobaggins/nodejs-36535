const { Router } = require('express');
const { getProducts, postProducts } = require('../controllers/products.controller');

const router = Router();

//End points

router.get('/', getProducts);

router.post('/', postProducts);

module.exports = router;