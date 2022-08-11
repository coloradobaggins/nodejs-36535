const ContenedorArchivo = require("../../contenedor/ContenedorArchivo");

class ProductsDaoFile extends ContenedorArchivo{
    
    constructor(){

        super('src/database/db_files/products.txt');
    
    }

}

module.exports = ProductsDaoFile;