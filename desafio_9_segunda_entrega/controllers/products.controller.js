
const dbEngine = process.env.DB_ENGINE || 'FILE';
console.log(`el engine eegido es: ${process.env.DB_ENGINE}`);

let objProductDao;

if(dbEngine === 'FILE'){
    const ProductosDaoArchivos = require('../daos/productos/ProductosDaoArchivos');
    objProductDao = new ProductosDaoArchivos();
}else if(dbEngine === 'MONGODB'){

    const ProductosDaoMongoDB = require('../daos/productos/ProductosDaoMongoDB');
    objProductDao = new ProductosDaoMongoDB();
}else if(dbEngine === 'FIREBASE'){

    const ProductosDaoFirebase = require('../daos/productos/ProductosDaoFirebase');
    objProductDao = new ProductosDaoFirebase();

}



const productsGet = async (req, res)=>{

    const { id = null } = req.params;

    console.log(`id: ${id}`);

    let prods = [];

    prods = await objProductDao.getAllProducts();

    
    if(id === null){

        try{

            prods = await objProductDao.getAllProducts();
    
        }catch(err){
            console.error(err);
        }

    }else{

        try{

            prods = await objProductDao.getProductById(id)

        }catch(err){

            console.error(err);
        }

    }
    
    
    res.json({
        prods
    })

}



const productsPost = async (req, res)=>{

    const product = req.body;

    product.timestamp = Date.now();

    try{

        await objProductDao.saveProduct(product);

    }catch(err){

        console.error(err);
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

        itemsResponse = await objProductDao.updateProduct(prodId, prod);

    }catch(err){
        console.log(err);
    }

    res.json({
        itemsResponse
    });

}

const productDelete = async (req, res)=>{

    const {id = null} = req.params;
    
    if(id!==null){

        try{

            await objProductDao.deleteProduct(id);
    
    
        }catch(err){
    
            console.log(err);
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