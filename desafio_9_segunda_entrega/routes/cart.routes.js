const { Router } = require('express');
const { getShoppingCart, 
        postShoppingCart, 
        deleteShoppingCart,
        addProdToCart,
        deleteProdFromCart 
    } = require('../controllers/cart.controller');

const router = Router();

router.post('/', postShoppingCart);             //Crea un carrito, devuelve su id
router.delete('/:id', deleteShoppingCart);      //Vacio un carrito y lo elimina
router.get('/:id/productos', getShoppingCart);  //Listar productos de un carrito
router.post('/:id/productos', addProdToCart);    //Incorpora producto por su id a carrito
router.delete('/:id/productos/:id_prod', deleteProdFromCart); //Elimina producto de carrito, por su id de carrito y de producto

module.exports = router;