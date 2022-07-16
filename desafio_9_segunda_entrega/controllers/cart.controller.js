const {CartDao} = require('../daos/daoSelector');

let objCartDao = CartDao;


// 1- Crea un carrito y devuelve su id
const postShoppingCart = async (req, res)=>{

    let newCart = [];

    try{

        newCart = await objCartDao.createCart(req.body);

    }catch(err){

        console.log(err);
        res.status(400).json({error: 'not ok'});

    }

    res.status(201).json({
        id: newCart
    });

}

// 2- Vaciar y borrar un carrito por su id
const deleteShoppingCart = async (req, res) =>{

    let cartId = req.params.id;

    try{

        await objCartDao.deleteCartById(cartId);

    }catch(err){
        console.log(err);
        res.status(400).json({error: err});
    }

    res.status(200).json({status: 'ok'});

}

// 3- Listar productos de un carrito
const getShoppingCart = async (req, res)=>{
    
    let cartId = req.params.id;

    let prodsCarrito = [];
    
    try{

        prodsCarrito = await objCartDao.getProdsFromCart(cartId);

       
    }catch(err){
        console.log(err);
        res.status(400).json({
            error: 'not ok',
            message: err
        });
    }

    res.json({
        prodsCarrito
    });

}

const addProdToCart = async (req, res)=>{

    let cartId = req.params.id;
    let prods = req.body;
    let prodAdded = false;
    
    try{

        prodAdded = await objCartDao.addProdsToCart(cartId, prods);

    }catch(err){
        console.log(err);
    }

    res.json({
        prodAdded
    })
}


const deleteProdFromCart = async (req, res)=>{


    let cartId = req.params.id;
    let prodId = req.params.id_prod;
    
    let deleted = false;

    try{

        deleted = await objCartDao.deleteProdFromCart(cartId, prodId);

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