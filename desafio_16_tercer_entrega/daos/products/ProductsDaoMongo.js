const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB');
const Product = require('../../models/Product');

class ProductDaoMongo extends ContenedorMongoDB{

    constructor(){
        super(Product);
    }

}

module.exports = ProductDaoMongo;