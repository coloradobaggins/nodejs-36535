const PersistenceFactory = require('../daos/PersistenceFactory');


// ** Al tener varios daos, varias fuentes de info, se ve la utilidad de usar este servicio.

class ProductService{

    constructor(){

        //this.productDao = new ProductsDaoMongo();
        this.productDao;
        this.init();
    }

    init = async()=>{

        this.productDao = await PersistenceFactory.getPersistence();

    }

    getProducts = async() =>{


        let prods = [];

        try{

            prods = await this.productDao.getAll();
    
        }catch(err){
            throw new Error('Error getting products');
        }

        return prods;

    }

    getProductById = async(id) =>{

        return await this.productDao.getById(id)

    }

    addProduct = async(prod) =>{

        let result;

        try{

            result = await this.productDao.save(prod);

        }catch(err){
            throw new Error('Error adding products');
        }

        return result;

    }

    updateProduct = async(id, objData) =>{

        let result;

        try{

            result = await this.productDao.update(id, objData);

        }catch(err){
            throw new Error('Error updating products');
        }
        

        return result;

    }

    deleteProduct = async(id) =>{

        let result;

        try{

            result = await this.productDao.deleteById(id);

        }catch(err){
            throw new Error('Error deleting product');
        }

        return result; 

    }

}

module.exports = ProductService;