class PersistenceFactory{

    static getPersistence = async () =>{

        switch(process.env.PERSISTENCE){
            case 'MONGODB':
                const ProductsDaoMongo = await require('./products/ProductsDaoMongo.js');
                return new ProductsDaoMongo();
            case 'FILE':
                const ProductDaoFile = await require('./products/ProductDaoFile.js');
                return new ProductDaoFile();
            default:
                throw new Error('**** Unknown persistence ****');
        }

    }

    static getCartPersistence = async()=>{

        switch(process.env.PERSISTENCE){
            case 'MONGODB':
                const CartDaoMongo = await require('./cart/CartDaoMongo.js');
                return new CartDaoMongo();
            case 'FILE':
                const CartDaoFile = await require('./cart/CartDaoFile.js');
                return new CartDaoFile();
            default:
                throw new Error('**** Unknown persistence ****');
        }

    }

}

module.exports = PersistenceFactory;