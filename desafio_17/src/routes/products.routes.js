const { Router } = require('express');
const { getProducts, saveProduct } = require('../controllers/products.controller');


const router = Router();

router.get('/', getProducts);
router.post('/', saveProduct);

module.exports = router;