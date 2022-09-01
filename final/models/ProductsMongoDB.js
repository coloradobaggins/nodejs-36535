const ContenedorMongoDB = require("../contenedores/ContenedorMongoDB");
const Product = require('./Product');
class ProductsMongoDB extends ContenedorMongoDB{

    constructor(){

        super(Product);

    }

    getProducts = async() =>{


        let prods = [];

        try{

            prods = await this.getAll();
    
        }catch(err){
            throw new Error('Error getting products');
        }

        return prods;

    }

    getProductById = async(id) =>{

        //return await this.getById(id)
        return await Product.findOne({_id: id}).populate('productos');
    }

    getProductsByCategory = async(cat) => {

        try{

            const products = await Product.find({category: cat});
            return products;

        }catch(err){
            console.log(err);
        }

    }

    getCategories = async() =>{

        try{

            const prods = await this.getProducts();
            const categories = prods.map((p)=> p.category);
            const uniqueCategories = [... new Set(categories)];

            return uniqueCategories;

        }catch(err){
            console.log(err)
        }

    }

    addProduct = async(prod) =>{

        let result;

        try{

            result = await this.save(prod);

        }catch(err){
            throw new Error('Error adding products');
        }

        return result;

    }

    updateProduct = async(id, objData) =>{

        let result;

        try{

            result = await this.update(id, objData);

        }catch(err){
            throw new Error('Error updating products');
        }
        

        return result;

    }

    deleteProduct = async(id) =>{

        let result;

        try{

            result = await this.deleteById(id);

        }catch(err){
            throw new Error('Error deleting product');
        }

        return result; 

    }

}

module.exports = ProductsMongoDB;