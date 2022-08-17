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
            user: req.user._id
        }

        let result = await cartService.createCart(cartObj);

        res.json({msg: 'agregado a carrito'})

    }

    res.json({
        status: 'redirect',
        msg: 'no_authenticated',
        url: '/login'
    })


}

const getCart = async (req, res)=>{

    console.log(`req.user`);

    console.log(req.user);

    res.json({user: req.user})


}

module.exports = { postCart, getCart }