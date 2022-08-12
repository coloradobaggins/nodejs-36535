//const ProductsDaoMongo = require('../daos/products/ProductsDaoMongo');
const PersistenceFactory = require('../daos/products/PersistenceFactory');


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

        return await this.productDao.getAll();

    }

    getProductById = async(id) =>{

        return await this.productDao.getById(id)

    }

    addProduct = async(prod) =>{

        return await this.productDao.save(prod);

    }

    updateProduct = async(id, objData) =>{

        return await this.productDao.update(id, objData);

    }

    deleteProduct = async(id) =>{

        return await this.productDao.deleteById(id);

    }

}

module.exports = ProductService;