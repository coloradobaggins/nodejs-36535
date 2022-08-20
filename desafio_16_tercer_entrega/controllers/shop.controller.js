const ProductService = require('../services/products.service');

const objProductService = new ProductService();

const getShop = async (req, res)=>{

    let prods = await objProductService.getProducts();
    

    let userLoggedIn = (req.isAuthenticated()) ? req.user.username : undefined;
    let userEmailLoggedIn = (req.isAuthenticated()) ? req.user.email : undefined;

    res.render('shop', {
        prods,
        userLoggedIn,
        userEmailLoggedIn
    });
    
}

module.exports = {getShop};