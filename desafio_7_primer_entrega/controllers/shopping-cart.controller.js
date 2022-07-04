const Contenedor = require('../models/Contenedor');

const objCarrito = new Contenedor('carrito.txt');

const postShoppingCart = (req, res)=>{

}

const deleteShoppingCart = (req, res) =>{

}

const getShoppingCart = async (req, res)=>{
    
    const idCarrito = req.params.id;

    try{

        const prodsCarrito = await objCarrito.getProdsFromCart(parseInt(idCarrito));

        res.json({
            prodsCarrito
        });

    }catch(err){
        console.log(err);
    }

}

const deleteProdFromCart = (req, res)=>{

    console.log("deleteProdFromCart");

}

module.exports = {  
    getShoppingCart, 
    postShoppingCart,
    deleteShoppingCart,
    deleteProdFromCart
};