//const PersistenceFactory = require('../daos/PersistenceFactory');
const CartDaoMongo = require('../models/CartMongoDB.js');

class CartService{

    constructor(){

        let objCartDao = this.cartDao;
        this.init();

    }

    init = async()=>{

        //this.cartDao = await PersistenceFactory.getCartPersistence();
        this.cartDao = new CartDaoMongo();

    }

    createCart = async(cartObj)=>{
        
        return await this.cartDao.createCart(cartObj);


    }

    addProductToCart = async(cartId, prods) =>{

        this.cartDao = await this.cartDao.addProdsToCart(cartId, prods);

    }

    getProductsFromCart = async(cartId) =>{

        return await this.cartDao.getById(cartId);

    }

    deleteProdInCart = async(prodId, cartId)=>{
        
        
        console.log(`En service, delete prod, cartId: ${cartId}, prodId: ${prodId}`);

        /*
        return await this.cartDao.deleteProdFromCart(prodId, cartId);
        */

        this.cartDao.whaaat();
    }

    /**
     * 
     * @param {string} userId 
     * @returns cartObject || null 
     */
    checkCartUserExists = async(userId) =>{
    
        let userCartExist = this.cartDao = await this.cartDao.getCartByUserID(userId);
        console.log(userCartExist);
        return userCartExist;
    }

    getCartByUserId = async(userId)=> {

        return await this.cartDao.getCartByUserID(userId);

    }

    deleteCartById = async(cartId)=>{

        return await this.cartDao.deleteCartById(cartId);

    }

    
}

module.exports = CartService;