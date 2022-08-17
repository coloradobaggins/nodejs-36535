const PersistenceFactory = require('../daos/PersistenceFactory');

class CartService{

    constructor(){

        this.cartDao;
        this.init();

    }

    init = async()=>{

        this.cartDao = await PersistenceFactory.getCartPersistence();

    }

    createCart = async(cartObj)=>{

        this.cartDao = await this.cartDao.createCart(cartObj);

    }

    addProductToCart = async(cartId, prods) =>{

        this.cartDao = await this.cartDao.addProdsToCart(cartId, prods);

    }

}

module.exports = CartService;