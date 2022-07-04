const { Router } = require('express');
const router = Router();

router.all('/', (req, res)=>{

    let reqMethod = req.method;
    
    res.json({
        error: -2,
        description: `ruta '${req.originalUrl}', metodo: '${reqMethod}', no implementada`
    });

});


module.exports = router;