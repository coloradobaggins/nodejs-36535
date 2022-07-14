const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB');
const carritoModel = require('../../models/Carrito');


class CarritosDaoMongoDB extends ContenedorMongoDB{

    constructor(){
        super(carritoModel);
    }

    async createCart(cartObj){

        cartObj.timestamp = Date.now();

        if(!cartObj.hasOwnProperty('productos')){
            cartObj.productos = [];
        }

        return await this.save(cartObj);

    }

    async deleteCartById(cartId){

        return await this.deleteById(cartId);

    }

}

module.exports = CarritosDaoMongoDB;