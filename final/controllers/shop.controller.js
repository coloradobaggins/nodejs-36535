const ProductsMongoDB = require('../models/ProductsMongoDB');

const productsMongoDB = new ProductsMongoDB();

const getShop = async (req, res)=>{

    let prods = await productsMongoDB.getProducts();
    

    let userLoggedIn = (req.isAuthenticated()) ? req.user.username : undefined;
    let userEmailLoggedIn = (req.isAuthenticated()) ? req.user.email : undefined;

    res.render('shop', {
        prods,
        userLoggedIn,
        userEmailLoggedIn
    });
    
}

module.exports = {getShop};