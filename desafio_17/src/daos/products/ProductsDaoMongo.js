const ContenedorMongoDB = require("../../contenedor/ContenedorMongoDB");
const Product = require('../../models/Product.js');

class ProductsDaoMongo extends ContenedorMongoDB{

    constructor(){
        super(Product);
    }
    
}

module.exports = ProductsDaoMongo;