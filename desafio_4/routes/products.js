const { Router } = require('express');
const { productsGet,
        productGet,
        productsPost,
        productsPut, 
        productsDelete } = require('../controllers/products.controller');

const router = Router();


//End Point
//Ruta: this.app.get('/api/productos' | Controller: la function
router.get('/', productsGet);  //productsGet (referencia - require script)

router.get('/:id', productGet);  //productsGet (referencia - require script)

router.post('/', productsPost);

router.put('/:id', productsPut);

router.delete('/', productsDelete);



module.exports = router;