class PersistenceFactory{
    
    static getPersistence = async()=> {
        
        switch(process.env.PERSISTENCE){
            case "MONGODB":
                const ProductsDaoMongo = await require('../products/ProductsDaoMongo');
                return new ProductsDaoMongo();

            case "FILE":
                const ProductsDaoFile = await require('../products/ProductsDaoFile');
                return new ProductsDaoFile();

            default:
                console.error(`*** INVALID PERSISTENCE CONFIGURATION! ***`);
        }

    }

}

module.exports = PersistenceFactory;