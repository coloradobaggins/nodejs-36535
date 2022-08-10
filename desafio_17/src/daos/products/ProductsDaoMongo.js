const ContenedorMongoDB = require("../../contenedor/ContenedorMongoDB");
const Product = require('../../models/Product.js');

class ProductsDaoMongo extends ContenedorMongoDB{

    constructor(){
        super(Product);
    }

    async getAllProducts(){

        return await this.getAll();   
        
    }

    async saveProduct(productData){

        return await this.save(productData);

    }

    async getProductById(id){

        return await this.getById(id);

    }

    async  updateProduct(prodId, prod){

        return await this.update(prodId, prod);

    }

    async deleteProduct(id){

        await this.deleteById(id);

    }

}

module.exports = ProductsDaoMongo;