const PersistenceFactory = require('../daos/PersistenceFactory');

class CartService{

    constructor(){

        let objCartDao = this.cartDao;
        this.init();

    }

    init = async()=>{

        this.cartDao = await PersistenceFactory.getCartPersistence();

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

}

module.exports = CartService;