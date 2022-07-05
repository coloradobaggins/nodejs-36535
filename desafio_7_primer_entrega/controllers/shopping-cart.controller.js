//const Contenedor = require('../models/Contenedor');
//const objCarrito = new Contenedor('carrito.txt');

const Carrito = require('../models/Carrito');
const objCarrito = new Carrito('carrito.txt');

// 1- Crea un carrito y devuelve su id
const postShoppingCart = async (req, res)=>{

    let newCart = [];

    try{

        newCart = await objCarrito.createCart(req.body);


    }catch(err){

        console.log(err);

    }

    res.status(201).json({
        id: newCart
    });

}

// 2- Vaciar y borrar un carrito por su id
const deleteShoppingCart = async (req, res) =>{

    let cartId = parseInt(req.params.id);

    try{

        await objCarrito.deleteCartById(cartId);

    }catch(err){
        console.log(err);
    }

    res.status(200).json({status: 'ok'});

}

// 3- Listar productos de un carrito
const getShoppingCart = async (req, res)=>{
    
    let cartId = parseInt(req.params.id);

    console.log(`Estamos aca, id: ${cartId}`);

    let prodsCarrito = [];
    
    try{

        prodsCarrito = await objCarrito.getProdsFromCart(cartId);

       
    }catch(err){
        console.log(err);
    }

    res.json({
        prodsCarrito
    });

}

const addProdToCart = async (req, res)=>{

    let cartId = parseInt(req.params.id);
    let prods = req.body;
    let prodAdded = false;
    
    try{

        prodAdded = await objCarrito.addProdsToCart(cartId, prods);

    }catch(err){
        console.log(err);
    }

    res.json({
        prodAdded
    })
}



const deleteProdFromCart = async (req, res)=>{


    let cartId = parseInt(req.params.id);
    let prodId = parseInt(req.params.id_prod);
    
    let deleted = false;

    try{

        deleted = await objCarrito.deleteProdFromCart(cartId, prodId);

    }catch(err){
        console.log(err);
    }

    res.json({
        deleted:deleted
    })
    
}

module.exports = {
    getShoppingCart,
    postShoppingCart,
    deleteShoppingCart,
    addProdToCart,
    deleteProdFromCart
};