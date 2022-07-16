const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB');
const { Carrito } = require('../../models');


class CarritosDaoMongoDB extends ContenedorMongoDB{

    constructor(){
        super(Carrito);
    }

    async createCart(cartObj){

        cartObj.timestamp = Date.now();

        if(!cartObj.hasOwnProperty('productos')){
            cartObj.productos = [];
        }

        console.log(cartObj);

        return await this.save(cartObj);

    }

    async deleteCartById(cartId){

        return await this.deleteById(cartId);

    }

    async getProdsFromCart(cartId){

        
        return await this.getById(cartId);

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

    /**
     * Elimina un producto por su ObjectId
     * 
     * @param {String} cartId (ObjectId)
     * @param {*} prodId 
     * @returns 
     */
    async deleteProdFromCart(cartId, prodId){
        
        console.log(`CartId: ${cartId}, prodId: ${prodId}`);

        try{
            
            let updated = await Carrito.findOneAndUpdate(
                {_id: cartId }, {
                    //$pull: {productos: {_id: prodId}} 
                    $pullAll: {productos: [prodId]} //Por su ObjectId en este array
                },
                { new: true });

            
            return updated;
            

        }catch(err){
            console.log(err);
        }
       
    }

}

module.exports = CarritosDaoMongoDB;