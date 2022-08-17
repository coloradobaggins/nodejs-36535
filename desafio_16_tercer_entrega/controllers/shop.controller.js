const ProductService = require('../services/products.service');

const objProductService = new ProductService();

const getShop = async (req, res)=>{

    let prods = await objProductService.getProducts();

    let authenticated = req.isAuthenticated();
    
    res.render('shop', {
        prods,
        authenticated
    });
}

module.exports = {getShop};