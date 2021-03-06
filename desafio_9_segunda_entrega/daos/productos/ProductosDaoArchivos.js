const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class ProductosDaoArchivos extends ContenedorArchivo{

    constructor(){
        //super('DB_FILES/productos.txt');

        const dbFileName = process.env.FILE_DB_PRODUCTOS || 'productos.txt';

        super('database/db_files/'+dbFileName);
    }

    async getAllProducts(){
        
       return await this.getAll();

    }

    async getProductById(id){

        return await this.getById(parseInt(id));

    }

    async saveProduct(prod){
        
        await this.save(prod);

    }

    async updateProduct(prodId, prod){

        await this.update(parseInt(prodId), prod);

    }

    async deleteProduct(id){

        await this.deleteById(parseInt(id));

    }

}


module.exports = ProductosDaoArchivos;