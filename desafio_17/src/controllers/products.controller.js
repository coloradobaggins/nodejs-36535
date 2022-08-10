const ProductService = require('../services/products.service');

const productService = new ProductService();

const getProducts = async(req, res)=>{

    let result = await productService.getProducts();

    res.send(result);

}

const saveProduct = async (req, res)=>{

    let product = req.body;

    let result = await productService.addProduct(product);
    
    res.send(result);

}

module.exports = { getProducts, saveProduct };