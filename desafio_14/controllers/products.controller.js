const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB');
const { Product } = require('../models/Product');
const {loggers} = require('../utils/logger');

let objProduct = new ContenedorMongoDB(Product);


const productsGet = async (req, res)=>{

    const { id = null } = req.params;

    console.log(`id: ${id}`);

    let prods = [];

    prods = await objProduct.getAll();

    
    if(id === null){

        try{

            prods = await objProduct.getAll();
    
        }catch(err){
            console.error(err);
            loggers.errorLogger.error(`Url: ${req.originalUrl}, Method: ${req.method} - Error: ${err}`);
        }

    }else{

        try{

            prods = await objProduct.getById(id)

        }catch(err){

            console.error(err);
            loggers.errorLogger.error(`Url: ${req.originalUrl}, Method: ${req.method} - Error: ${err}`);
        }

    }
    

    res.render('getProducts', { 
        prods, 
        userLoggedIn: req.user.username,
        userEmailLoggedIn: req.user.email 
    });


}



const productsPost = async (req, res)=>{

    const product = req.body;

    product.timestamp = Date.now();

    try{

        await objProduct.save(product);

    }catch(err){

        console.error(err);
        loggers.errorLogger.error(`Url: ${req.originalUrl}, Method: ${req.method} - Error: ${err}`);
    }

    res.json({
        status:"send"
    });

}

const productUpdate = async (req, res)=>{

    //const prodId    = parseInt(req.params.id);
    const prodId    = req.params.id;
    const prod      = req.body;

    let itemsResponse = [];

    try{    

        itemsResponse = await objProduct.update(prodId, prod);

    }catch(err){
        console.log(err);
        loggers.errorLogger.error(`Url: ${req.originalUrl}, Method: ${req.method} - Error: ${err}`);
    }

    res.json({
        itemsResponse
    });

}

const productDelete = async (req, res)=>{

    const {id = null} = req.params;
    
    if(id!==null){

        try{

            await objProduct.deleteById(id);
    
    
        }catch(err){
    
            console.log(err);
            loggers.errorLogger.error(`Url: ${req.originalUrl}, Method: ${req.method} - Error: ${err}`);
        }

    }
    

    res.json({
        id
    });

}



module.exports = {  productsGet,
                    productsPost,
                    productUpdate,
                    productDelete
                 };