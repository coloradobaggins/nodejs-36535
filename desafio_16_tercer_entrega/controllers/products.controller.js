const ProductService = require('../services/products.service');
const ProductDTO = require('../dtos/ProductDTO');

const productService = new ProductService();

const productsGet = async (req, res)=>{


    let prods = await productService.getProducts();

    res.render('getProducts',{ 
        prods, 
        userLoggedIn: req.user.username,
        userEmailLoggedIn: req.user.email 
    });

}

const productsPost = async(req, res)=> {

    let product = req.body;

    let result = await productService.addProduct(product);    

    res.json({msg: result});

}

const productUpdate = async (req, res)=>{

    const prodId = req.params.id;
    const objProd = req.body;


    let result = await productService.updateProduct(prodId, objProd)

    res.json({result});

}

const productDelete = async (req, res)=>{

    const id = req.params.id;

    let result = await productService.deleteProduct(id);

    let response = (result) ? result : false;

    res.json({deleted: response});

}

module.exports = {  
    productsGet,
    productsPost,
    productUpdate,
    productDelete
 };