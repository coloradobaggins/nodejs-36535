const { Router } = require('express');
const { 
        productsGet, 
        productsPost,
        productUpdate,
        productDelete 
    } = require('../controllers/products.controller');

const router = Router();

router.get('/:id?', productsGet);
router.post('/', productsPost);
router.put('/:id', productUpdate);
router.delete('/:id', productDelete);

module.exports = router;