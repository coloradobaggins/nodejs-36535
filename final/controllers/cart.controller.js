const CartService = require('../services/cart.service');



const getCart = async (req, res)=>{

    const cartService = new CartService();

    
    let userCart = await cartService.getCartByUserId(req.user._id);


    let productsInCart = {}
    let totalPrice = 0;
    
    if(userCart!== null){

        productsInCart = await cartService.getProductsFromCart(userCart._id);

        const allProds = productsInCart.productos;
        /*
        console.log(`productsInCart.productos: `);
        console.log(allProds);
        console.log(allProds.length);
        */

        if(allProds.length > 0){
            totalPrice = cartService.getTotalPriceOfCart(allProds);
            console.log(totalPrice);
        }
        

    }

    let userLoggedIn = (req.isAuthenticated()) ? req.user.username : undefined;
    let userEmailLoggedIn = (req.isAuthenticated()) ? req.user.email : undefined;
    
    res.render('cart', {
        prods: productsInCart.productos,
        totalPrice: totalPrice,
        userLoggedIn,
        userEmailLoggedIn
    });

}


//Crear 1 carrito:
const postCart = async (req, res)=>{

    const cartService = new CartService();

    //Check si estamos authenticados

    if(req.isAuthenticated()){

         //Agregar a array de session de usuario los productos.
        let {_id} = req.body;
        console.log(`Agregar prod a carrito: ${_id}`);  


        let cartObj = {
            user: req.user._id,
            productos: _id
        }

        let result = await cartService.createCart(cartObj);

        return res.json({
            msg: 'agregado a carrito',
            status: 'success'
        })
        
    }

    res.json({
        status: 'redirect',
        msg: 'no_authenticated',
        url: '/login'
    })


}


const deleteProdFromCart = async(req, res)=>{

    const cartService = new CartService();

    const prodId = req.params.id;
    console.log(`Borrar este producto!! del carrito, id: ${prodId}`);

    const loggedUserId = req.user._id;
    const cartId = await cartService.checkCartUserExists(loggedUserId);

    console.log(` ***** cart id ${cartId._id} **** `);
    console.log(` ***** prod id ${prodId} **** `);

    const result = await cartService.deleteProdInCart(prodId, cartId._id);

    return res.json({
        status: 'ok'
    })
}


module.exports = { postCart, getCart, deleteProdFromCart }