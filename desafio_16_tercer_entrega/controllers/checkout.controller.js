const CartService = require('../services/cart.service');
const { sendEmailNotification } = require('../utils/emailSender');


const cartService = new CartService();

const getCheckout = async (req, res) => {

    let userCart = await cartService.getCartByUserId(req.user._id);
    let productsInCart = {}

    if(userCart!== null){

        productsInCart = await cartService.getProductsFromCart(userCart._id);

    }

    let prods = productsInCart.productos;

    
    let htmlEmailBody =`<h1 style="color: blue;">Tenemos un nuevo pedido!</h1>
    <h2>Listado de productos: </h2>`;

    htmlEmailBody += `<ul>`;
    for (const item of prods) {
        
        htmlEmailBody+= `<li>${item.name} - ($ ${item.price})</li>`

    }
    htmlEmailBody += `</ul>`;

    let subject = `Nuevo pedido de ${req.user.name} (${req.user.email})`;

    sendEmailNotification(subject, htmlEmailBody);
    

    let userLoggedIn = (req.isAuthenticated()) ? req.user.username : undefined;
    let userEmailLoggedIn = (req.isAuthenticated()) ? req.user.email : undefined;

    res.render('checkout', {
        userLoggedIn,
        userEmailLoggedIn
    });

}

const postCheckout = (req, res)=>{




}

module.exports = {postCheckout, getCheckout};