const ProductsMongoDB = require('../models/ProductsMongoDB');

const productMongoDB = new ProductsMongoDB();

const productsGet = async (req, res)=>{


    let prods = await productMongoDB.getProducts();

    res.render('getProducts',{ 
        prods, 
        userLoggedIn: req.user.name,
        userEmailLoggedIn: req.user.email 
    });

}

const productsPost = async(req, res)=> {

    let product = req.body;

    let result = await productMongoDB.addProduct(product);    

    let status = (result) ? 'success' : 'error';

    res.json({
        status,
        msg: result
    });

}

const productUpdate = async (req, res)=>{

    console.log(`******************* LLEGAMOS AL UPDATE!!!!! *******************`);

    const prodId = req.params.id;
    const objProd = req.body;


    let result = await productMongoDB.updateProduct(prodId, objProd);
    console.log(result);
    let status = (result) ? 'success' : 'error';

    res.json({
        result,
        status
    });

}

const productDelete = async (req, res)=>{

    const id = req.params.id;

    let result = await productMongoDB.deleteProduct(id);

    //let response = (result) ? result : false;
    let status = (response) ? 'success' : 'error';

    res.json({
        status,
        deleted: response
    });

}

module.exports = {  
    productsGet,
    productsPost,
    productUpdate,
    productDelete
 };