const { getProducts, 
        postProducts, 
        updateProduct, 
        deleteProduct 
    } = require('../services/products.services');

const productsGet = async (req, res)=>{

    const { id = null } = req.params;

    
    let prods = await getProducts(id, req);

    res.render('pages/getProducts', { 
        prods, 
        userLoggedIn: req.user.username,
        userEmailLoggedIn: req.user.email 
    });


}



const productsPost = async (req, res)=>{

    const product = req.body;

    let result = await postProducts(product, req);
    
    let sended = (result) ? 'sended' : 'error';

    res.json({
        status: sended
    });

}

const productUpdate = async (req, res)=>{

    //const prodId    = parseInt(req.params.id);
    const prodId    = req.params.id;
    const prod      = req.body;


    let update = updateProduct(prodId, prod, req);


    res.json({
        update
    });

}

const productDelete = async (req, res)=>{

    let id = deleteProduct(req);

    res.json({
        id
    });

}



module.exports = {  productsGet,
                    productsPost,
                    productUpdate,
                    productDelete
                 };