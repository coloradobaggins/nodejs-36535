const { Router } = require('express');
const { productsSessionChecker } = require('../middlewares/session_checker');

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

router.get('/:id?', productsSessionChecker, productsGet);
router.post('/', [productsSessionChecker, isAdmin], productsPost);
router.put('/:id', [productsSessionChecker, isAdmin], productUpdate);
router.delete('/:id', [productsSessionChecker, isAdmin], productDelete);


module.exports = router;