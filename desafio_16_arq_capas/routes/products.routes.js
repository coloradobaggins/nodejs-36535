const { Router } = require('express');
const {checkAuthentication} = require('../middlewares/checkAuthentication');

//const { productsSessionChecker } = require('../middlewares/session_checker');

const { productsGet, 
        productsPost,
        productUpdate,
        productDelete
    } = require('../controllers/products.controller');

const router = Router();


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

router.get('/:id?', checkAuthentication, productsGet);
router.post('/', [checkAuthentication, isAdmin], productsPost);
router.put('/:id', [checkAuthentication, isAdmin], productUpdate);
router.delete('/:id', [checkAuthentication, isAdmin], productDelete);


module.exports = router;