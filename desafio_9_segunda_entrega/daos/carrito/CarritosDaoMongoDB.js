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

    async getProdsFromCart(cartId){

        return await this.getById(cartId);

    }

    /**
     * Recibe 1 objeto literal y pushea a array productos del carrito elegido por su cartId
     * 
     * @param {String} cartId (ObjectId)
     * @param {*} prods 
     * @returns 
     */
    async addProdsToCart(cartId, prods){

        try{

            let updated = await carritoModel.findOneAndUpdate(
                { _id: cartId }, 
                { $push: {productos: prods} },
                { new: true });

            return updated;

        }catch(err){
            console.log(err);
        }

    }

    /**
     * Elimina 1 producto por su id de un carrito elegido por su id
     * 
     * @param {String} cartId (ObjectId)
     * @param {*} prodId 
     * @returns 
     */
    async deleteProdFromCart(cartId, prodId){

        try{
            
            let updated = await carritoModel.updateOne(
                {_id: cartId }, {
                    $pull: {productos: {id: prodId}}
                },
                { new: true });

            
            return updated;
            

        }catch(err){
            console.log(err);
        }
       
    }

}

module.exports = CarritosDaoMongoDB;