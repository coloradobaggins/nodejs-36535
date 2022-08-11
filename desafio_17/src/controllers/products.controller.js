const ProductService = require('../services/products.service');
const ProductDTO = require('../dtos/ProductDTO');



const productService = new ProductService();

const getProducts = async(req, res)=>{

    let result = await productService.getProducts();

    let resultDTO = result.map(prod => new ProductDTO(prod));   //Antes de enviar la response, pasar por la capa DTO

    //res.send(result);
    res.send(resultDTO);

}

const saveProduct = async (req, res)=>{

    let product = req.body;

    let result = await productService.addProduct(product);
    
    res.send(result);

}

module.exports = { getProducts, saveProduct };