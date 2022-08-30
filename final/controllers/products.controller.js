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

    res.json({msg: result});

}

const productUpdate = async (req, res)=>{

    const prodId = req.params.id;
    const objProd = req.body;


    let result = await productMongoDB.updateProduct(prodId, objProd)

    res.json({result});

}

const productDelete = async (req, res)=>{

    const id = req.params.id;

    let result = await productMongoDB.deleteProduct(id);

    let response = (result) ? result : false;
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