const CartService = require('../services/cart.service');

const cartService = new CartService();

//Crear 1 carrito:
const postCart = async (req, res)=>{

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

        res.json({msg: 'agregado a carrito'})
        return;
    }

    res.json({
        status: 'redirect',
        msg: 'no_authenticated',
        url: '/login'
    })


}

const getCart = async (req, res)=>{

    //Console.log(l)
    
    let userCart = await cartService.getCartByUserId(req.user._id);

    console.log(`tiene carro este user? `);
    console.log(userCart);

    let productsInCart = {}

    if(userCart!== null){

        productsInCart = await cartService.getProductsFromCart(userCart._id);
        //res.send(productsInCart);

        console.log(productsInCart.productos);

    }

    let userLoggedIn = (req.isAuthenticated()) ? req.user.username : undefined;
    let userEmailLoggedIn = (req.isAuthenticated()) ? req.user.email : undefined;
    
    res.render('cart', {
        prods: productsInCart.productos,
        userLoggedIn,
        userEmailLoggedIn
    });

}


const deleteProdFromCart = async(req, res)=>{

    const prodId = req.params.id;
    console.log(`Borrar este producto!! del carrito, id: ${prodId}`);

    const loggedUserId = req.user._id;
    const cartId = await cartService.checkCartUserExists(loggedUserId);

    const result = await cartService.deleteProdInCart(prodId, cartId);

    res.json({status: 'checking...'})
}

module.exports = { postCart, getCart, deleteProdFromCart }