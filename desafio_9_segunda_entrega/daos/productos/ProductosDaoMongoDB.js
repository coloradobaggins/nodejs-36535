const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB');
//const productModel = require('../../models/Product');
const { Product } = require('../../models');

class ProductosDaoMongoDB extends ContenedorMongoDB{

    constructor(){
        super(Product);
    }

    async getAllProducts(){

        return await this.getAll();

    }

    async getProductById(id){

        return await this.getById(id);

    }

    async saveProduct(productData){

        await this.save(productData);

    }

    async  updateProduct(prodId, prod){

        return await this.update(prodId, prod);

    }

    async deleteProduct(id){

        await this.deleteById(id);

    }



}

module.exports = ProductosDaoMongoDB;