const ProductDaoMongo = require('../daos/products/ProductsDaoMongo');

//Al tener varios daos, varias fuentes de info, se ve la utilidad de usar este servicio.

class ProductService{

    constructor(){

        this.productDao = new ProductDaoMongo();

    }

    getProducts = async() =>{

        return this.productDao.getAllProducts();

    }

    addProduct = async(prod) =>{

        this.productDao.saveProduct(prod)

    }

}

module.exports = ProductService;