const { Router } = require('express');
const { productsGet,
        productGet,
        productsPost,
        productsPostFront,
        productsPut, 
        productsDelete } = require('../controllers/products.controller');

const router = Router();


//End Points
router.get('/', productsGet);

router.get('/:id', productGet);

router.post('/', productsPost);

router.post('/front', productsPostFront);

router.put('/:id', productsPut);

router.delete('/:id', productsDelete);



module.exports = router;