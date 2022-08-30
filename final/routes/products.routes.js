const { Router } = require('express');
const { checkAuthentication, checkAdminRol } = require('../middlewares/');

//const { productsSessionChecker } = require('../middlewares/session_checker');

const { productsGet, 
        productsPost,
        productUpdate,
        productDelete
    } = require('../controllers/products.controller');

const router = Router();

/*
const isAdmin = (req, res, next)=>{

    const ADMINISTRADOR = false;

    if(ADMINISTRADOR){   
        next();
    }else{
        res.json({
            error:-1,
            descripcion: `Ruta ${req.originalUrl} y metodo ${req.method} no autorizas`
        })
    }
}
*/


router.get('/:id?', [checkAuthentication, checkAdminRol], productsGet);
router.post('/', [checkAuthentication, checkAdminRol], productsPost);
router.put('/:id', [checkAuthentication, checkAdminRol], productUpdate);
router.delete('/:id', [checkAuthentication, checkAdminRol], productDelete);


module.exports = router;