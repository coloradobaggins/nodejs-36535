const ContenedorMongoDB = require("../contenedores/ContenedorMongoDB");
const Cart = require('./Cart');
const {ObjectId} = require('mongodb');

class CartMongoDB extends ContenedorMongoDB{

    constructor(){
        super(Cart);
    }

    async createCart(cartObj){

        console.log(cartObj.user);

        //let cartUserExist = await this.getCartByUserID(cartObj.user);
        let cartUserExist = await this.getCartByUser(cartObj.user);
        
        //Si no existe el cart: 
        if(cartUserExist == null){

            cartObj.timestamp = Date.now();

            if(!cartObj.hasOwnProperty('productos')){
                cartObj.productos = [];
            }

            console.log(cartObj);

            return await this.save(cartObj);

        }


        let cartId = cartUserExist._id;
        let productos = cartObj.productos


        if(await this.checkProdInCart(cartId, productos) == null){  //Agrego producto si no existe previamente en carrito.

            await this.addProdsToCart(cartId, productos);

            console.log(`Producto agregado`);
        }

        return;
        
    }

    /**
     * Recibe un objeto literal con el ObjectId correspondiente a un producto y pushea a array productos del carrito elegido por su cartId
     * 
     * @param {String} cartId (ObjectId)
     * @param {*} prods 
     * @returns object (added object)
     */
     async addProdsToCart(cartId, prods){

        try{

            let updated = await Cart.findOneAndUpdate(
                { _id: cartId }, 
                { $push: {productos: prods} },
                { new: true });

            return updated;

        }catch(err){
            console.log(err);
        }

    }

    async getProductsCart(cartId){

        try{

            return await this.model.findOne({_id: cartId}).populate('productos');

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
    async deleteTheProd(cartId, prodId){

        try{
            
            let updated = await Cart.findOneAndUpdate(
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

    /**
     * 
     * @param {string} cartId 
     * @param {string} prodId 
     * @returns null || objet
     */
    async checkProdInCart(cartId, prodId){

        let objIdCart = new ObjectId(cartId);
        let objIdProd = new ObjectId(prodId);

        try{

            let prodCheck = await Cart.findOne({$and: [{_id: objIdCart}, { productos: objIdProd}]});

            return prodCheck;


        }catch(err){
            console.log(`Error al validar si existe este producto en este carrito: ${err}`);
            throw new Error(err);
        }

    }

    /**
     * 
     * @param {string} userId 
     * @returns null || object
     */
    async getCartByUser(userId){

        try{

            let userObjId = new ObjectId(userId); 
            let userCartFinded  = await Cart.findOne({user: userObjId});
            
            return userCartFinded;
            //return userID;

        }catch(err){
            console.log(`Error getting cartByUserId${err}`);
            throw new Error(err);
        }
        
    }

    async deleteCartById(cartId){

        return await this.deleteById(cartId);

    }

}

module.exports = CartMongoDB;