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

    res.json({msg: result});

}

const updateProduct = async(req, res)=>{

    const prodId = req.params.id;
    const objProd = req.body;


    let result = await productService.updateProduct(prodId, objProd)

    res.json({result});

}

const deleteProduct = async (req, res)=>{

    const id = req.params.id;

    let result = await productService.deleteProduct(id);

    let response = (result) ? result : false;

    res.json({deleted: response});

} 

module.exports = { getProducts, saveProduct, updateProduct, deleteProduct };