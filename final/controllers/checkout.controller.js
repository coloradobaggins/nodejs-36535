const CartService = require('../services/cart.service');
const OrderService = require('../services/Order.service');
const { sendEmailNotification } = require('../utils/emailSender');
const {sendMsg} = require('../utils/smsSender');


const cartService = new CartService();

const getCheckout = async (req, res) => {

    let userCart = await cartService.getCartByUserId(req.user._id);
    let cartId = userCart._id;  //Id de carito, vinculado a este user

    let productsInCart = {}

    if(userCart!== null){

        productsInCart = await cartService.getProductsFromCart(cartId);

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



    //Send SMS:

    const userPhone = req.user.phone;
    if(userPhone !== '' || userPhone !== null || userPhone !== undefined) {

        let smsBody = `Su pedido se ha recibido correctamente, el mismo se encuentra en proceso. Gracias!`;

        //console.log(`Comentada la funcion enviar sms para no gastar el credito free!`);
        sendMsg(userPhone, smsBody);

    }
    
    // *** Vaciar / Eliminar carrito ***

    let deleteCartById = await cartService.deleteCartById(cartId);

    console.log(`deleted?`);
    console.log(deleteCartById);

    res.render('checkout', {
        userLoggedIn,
        userEmailLoggedIn
    });

}

const postCheckout = async (req, res)=>{

    const body = req.body;
    console.log(body);

    const orderService = new OrderService();
 
    let prodsFormattedArray = orderService.getProductAndCantArrayObj(body);
 
    const orderObj = {
        user: req.user._id,
        productos: prodsFormattedArray
    }

    console.log(orderObj);

    await orderService.createOrder(orderObj);


    res.redirect('/checkout');


}

module.exports = { postCheckout, getCheckout };