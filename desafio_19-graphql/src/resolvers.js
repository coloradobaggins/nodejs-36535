//Resolvers: que vamos a hacer cuando llegue una consulta/
//Definicion de operaciones: (como deben devolver data)

let products = [];
let counter = 1;


const resolvers = {
    getAllProducts: () => products,
    getProductById: (data) => {

        let parsedId = parseInt(data.id);

        for(let i=0; i<products.length; i++) {
            if(products[i].id === parsedId) return products[i];
        }
        return null;

    },
    addProduct: (data) =>{
        
        let product = {
            'id': counter,
            'name': data.name,
            'description': data.description,
            'price': data.price,
            'code': data.code,
            'stock': data.stock
        }

        products.push(product);

        counter++;
        return product;
    },
    updateProduct: (data) =>{

        let parsedId = parseInt(data.id);
        console.log(`Update Product: ${parsedId}, data: ${data.name}`);

        let findProduct = products.find(p => p.id === parsedId);
        console.log(findProduct);

        if(findProduct !== undefined){
            
            findProduct.name = data.name;
            findProduct.description = data.description;
            findProduct.price = data.price;
            findProduct.code = data.code;
            findProduct.stock = data.stock;
            

            return findProduct;

        }else{
            throw new Error("Product not found");
        }

    },
    deleteProduct: ({id})=>{

        let parsedId = parseInt(id);
        let findedIndex = products.findIndex(p => p.id === parsedId);
        
        if(findedIndex !== -1){
            products.splice(findedIndex, 1);
        }else{
            throw new Error("Product not found");
        }
        
    },
    deleteAll: ()=>{

        products = [];

        return products;
    }
    

}

export default resolvers;