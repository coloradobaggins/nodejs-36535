const dbEngine = process.env.DB_ENGINE || 'FILE';
console.log(`el engine eegido es: ${process.env.DB_ENGINE}`);

let objCartDao;

if(dbEngine === 'FILE'){
    const CarritosDaoArchivos = require('../daos/carrito/CarritosDaoArchivos');
    objCartDao = new CarritosDaoArchivos();
}else if(dbEngine === 'MONGODB'){

    const CarritosDaoMongoDB = require('../daos/carrito/CarritosDaoMongoDB');
    objCartDao = new CarritosDaoMongoDB();
}/*else if(dbEngine === 'FIREBASE'){

    const ProductosDaoFirebase = require('../daos/productos/ProductosDaoFirebase');
    objCartDao = new CarritoDaoFirebase();

}*/


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

    console.log(`Estamos aca, id: ${cartId}`);

    let prodsCarrito = [];
    
    try{

        prodsCarrito = await objCartDao.getProdsFromCart(cartId);

       
    }catch(err){
        console.log(err);
        res.status(400).json({error: 'not ok'});
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
    let prodId = parseInt(req.params.id_prod);
    
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