const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB');
const { Product } = require('../models/Product');


let objProduct = new ContenedorMongoDB(Product);

const getProducts = async (id, req)=>{

    let prods = [];

   
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

    return prods;

}


const postProducts = async (product, req)=>{

    product.timestamp = Date.now();

    try{

        await objProduct.save(product);

        return true;

    }catch(err){

        console.error(err);
        loggers.errorLogger.error(`Url: ${req.originalUrl}, Method: ${req.method} - Error: ${err}`);
    }

}


const updateProduct = async (prodId, prod, req)=>{

    let itemsResponse = [];

    try{    

        itemsResponse = await objProduct.update(prodId, prod);

    }catch(err){

        console.log(err);
        loggers.errorLogger.error(`Url: ${req.originalUrl}, Method: ${req.method} - Error: ${err}`);
    
    }

    return itemsResponse;

}

const deleteProduct = async(req)=>{
    const {id = null} = req.params;
    
    if(id!==null){

        try{

            await objProduct.deleteById(id);
    
    
        }catch(err){
    
            console.log(err);
            loggers.errorLogger.error(`Url: ${req.originalUrl}, Method: ${req.method} - Error: ${err}`);
        }

    }

    return id;
}


module.exports = { getProducts, postProducts, updateProduct, deleteProduct }