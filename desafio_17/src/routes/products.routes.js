const { Router } = require('express');
const { getProducts, saveProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');


const router = Router();


router.get('/:id?', getProducts);
router.post('/', saveProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


module.exports = router;