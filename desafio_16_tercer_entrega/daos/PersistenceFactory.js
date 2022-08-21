const path = require('path');
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
                //const dirPath = path.join(__dirname, '/cart/CartDaoMongo.js');
                //const CartDaoMongo = await require(dirPath);
                return new CartDaoMongo();
            case 'FILE':
                const CartDaoFile = await require('./cart/CartDaoFile.js');
                return new CartDaoFile();
            default:
                throw new Error('**** Unknown persistence ****');
        }

    }

    static getUserPersistence = async()=>{

        switch(process.env.PERSISTENCE){
            case 'MONGODB':
                const UserDaoMongo = await require('./user/UserDaoMongo.js');
                return new UserDaoMongo();
            case 'FILE':
                const UserDaoFile = await require('./user/UserDaoFile.js');
                return new UserDaoFile();
            default:
                throw new Error('**** Unknown persistence ****');
        }

    }

}

module.exports = PersistenceFactory;