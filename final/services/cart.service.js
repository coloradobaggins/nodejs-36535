//const PersistenceFactory = require('../daos/PersistenceFactory');
const CartMongo = require('../models/CartMongoDB.js');
const Cart = require('../models/Cart.js');
class CartService{

    constructor(){

        this.cartMongo;
        this.init();

    }

    init = async()=>{

        //this.cartDao = await PersistenceFactory.getCartPersistence();
        this.cartMongo = new CartMongo();

    }

    createCart = async(cartObj)=>{
        
        return await this.cartMongo.createCart(cartObj);


    }

    addProductToCart = async(cartId, prods) =>{

        this.cartMongo = await this.cartMongo.addProdsToCart(cartId, prods);

    }

    getProductsFromCart = async(cartId) =>{

        return await this.cartMongo.getProductsCart(cartId);

    }

    getTotalPriceOfCart = (prodsArr)=>{

        return prodsArr.map((prod)=> prod.price).reduce((prev, next) => prev + next);

    }


    deleteProdInCart = async(prodId, cartId)=>{
        
        
        console.log(`En service, delete prod, cartId: ${cartId}, prodId: ${prodId}`);

        //NO reconoce esta funcion, porque se ejecuta otra antes que esta en el controller. como que no permite ejecutar mas de 1...
        //return await this.cartMongo.deleteTheProd(prodId, cartId);
        
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
     * @param {string} userId 
     * @returns cartObject || null 
     */
    checkCartUserExists = async(userId) =>{
    
        let userCartExist = this.cartMongo = await this.cartMongo.getCartByUser(userId);
        //console.log(userCartExist);
        return userCartExist;
    }

    getCartByUserId = async(userId)=> {

        return await this.cartMongo.getCartByUser(userId);

    }

    deleteCartById = async(cartId)=>{

        return await this.cartMongo.deleteCartById(cartId);

    }

    
}

module.exports = CartService;