import { buildSchema } from 'graphql';

//Entidad Producto
let schema = buildSchema(`
    type Product {
        id: ID!
        name: String
        description: String
        price: Int
        code: String
        stock: Int
    }
    type Query {
        getAllProducts: [Product]
        getProductById(id: ID!): Product
    }
    type Mutation {
        addProduct(name: String, description: String, price:Int, code: String, stock: Int): Product
        updateProduct(id: ID!,  name: String, description: String, price:Int, code: String, stock: Int): Product
        deleteProduct(id: ID!): Product
        deleteAll: [Product]
    }
`);

export default schema;