const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");

class ProductosDaoFirebase extends ContenedorFirebase{
    
    constructor(){
        super('products');
    }

    async saveProduct(prod){
        await this.save(prod)
    }

    async getProductById(id){
        return await this.getById(id);
    }

    async getAllProducts(){
        return await this.getAll();
    }

    async deleteProduct(id){
        await this.deleteById(id);
    }

    async updateProduct(prodId, prod){
        await this.update(prodId, prod)
    }
}

module.exports = ProductosDaoFirebase;