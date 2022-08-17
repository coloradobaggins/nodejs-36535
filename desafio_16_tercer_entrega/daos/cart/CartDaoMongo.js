const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");
const Cart = require('../../models/Cart');

class CartDaoMongo extends ContenedorMongoDB{

    constructor(){
        super(Cart);
    }

    async createCart(cartObj){

        cartObj.timestamp = Date.now();

        if(!cartObj.hasOwnProperty('productos')){
            cartObj.productos = [];
        }

        console.log(cartObj);

        return await this.save(cartObj);

    }

    /**
     * Recibe un objeto literal con el ObjectId correspondiente a un producto y pushea a array productos del carrito elegido por su cartId
     * 
     * @param {String} cartId (ObjectId)
     * @param {*} prods 
     * @returns 
     */
     async addProdsToCart(cartId, prods){

        try{

            let updated = await Carrito.findOneAndUpdate(
                { _id: cartId }, 
                { $push: {productos: prods} },
                { new: true });

            return updated;

        }catch(err){
            console.log(err);
        }

    }

}

module.exports = CartDaoMongo;