const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");

class ProductosDaoFirebase extends ContenedorFirebase{
    
    constructor(){
        super('products');
    }

    async saveProduct(prod){

        await this.save(prod)

    }

    async getAllProducts(){

        return await this.getAll();

    }
}

module.exports = ProductosDaoFirebase;