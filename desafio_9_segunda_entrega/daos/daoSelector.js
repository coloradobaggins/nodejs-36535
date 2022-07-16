const dbEngine = process.env.DB_ENGINE || 'FILE';

console.log(`db engine seleccionado: ${dbEngine}`);

let CartDao;
let ProductDao;

if(dbEngine === 'FILE'){

    const ProductosDaoArchivos = require('./productos/ProductosDaoArchivos');
    const CarritosDaoArchivos = require('./carrito/CarritosDaoArchivos');

    ProductDao = new ProductosDaoArchivos();
    CartDao = new CarritosDaoArchivos();

}else if(dbEngine === 'MONGODB'){

    const ProductosDaoMongoDB = require('./productos/ProductosDaoMongoDB');
    const CarritosDaoMongoDB = require('./carrito/CarritosDaoMongoDB');

    ProductDao = new ProductosDaoMongoDB();
    CartDao = new CarritosDaoMongoDB();

}else if(dbEngine === 'FIREBASE'){

    const ProductosDaoFirebase = require('./productosProductosDaoFirebase');
    const CarritosDaoFirebase = require('./carrito/CarritosDaoFirebase');

    ProductDao = new ProductosDaoFirebase();
    CartDao = new CarritosDaoFirebase();

}

module.exports = { CartDao, ProductDao};
