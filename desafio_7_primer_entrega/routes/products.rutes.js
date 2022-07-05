const { Router } = require('express');
const { 
        productsGet, 
        productsPost,
        productUpdate,
        productDelete 
    } = require('../controllers/products.controller');

const router = Router();

/**
 * Middleware
 * Chequea que administrador sea true para ejecutar next y pasar a la siguiente funcion
 */
const isAdmin = (req, res, next)=>{

    const ADMINISTRADOR = true;

    if(ADMINISTRADOR){   
        next();
    }else{
        res.json({
            error:-1,
            descripcion: `Ruta ${req.originalUrl} y metodo ${req.method} no autorizas`
        })
    }
}

router.get('/:id?', productsGet);
router.post('/', isAdmin, productsPost);
router.put('/:id', isAdmin, productUpdate);
router.delete('/:id', isAdmin, productDelete);

module.exports = router;