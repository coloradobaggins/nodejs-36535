const ProductsMongoDB = require('../models/ProductsMongoDB');



const getShop = async (req, res)=>{
    const productsMongoDB = new ProductsMongoDB();

    let prods = await productsMongoDB.getProducts();
    const categories = await productsMongoDB.getCategories();


    let userLoggedIn = (req.isAuthenticated()) ? req.user.username : undefined;
    let userEmailLoggedIn = (req.isAuthenticated()) ? req.user.email : undefined;


    res.render('shop', {
        prods,
        categories,
        userLoggedIn,
        userEmailLoggedIn
    });
    
}

const getShopByCategory = async(req, res)=>{

    console.log(`getShopByCategory`);

    const productsMongoDB = new ProductsMongoDB();
    const selectedCategory = req.params.product;

    let productsFiltered = await productsMongoDB.getProductsByCategory(selectedCategory);
    const categories = await productsMongoDB.getCategories();


    let userLoggedIn = (req.isAuthenticated()) ? req.user.username : undefined;
    let userEmailLoggedIn = (req.isAuthenticated()) ? req.user.email : undefined;

    res.render('shopFiltered',{
        prods: productsFiltered,
        categories,
        userLoggedIn,
        userEmailLoggedIn
    })


}

module.exports = { getShop, getShopByCategory };