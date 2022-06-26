const { response } = require('express'); 
const Contenedor = require('../models/Contenedor');

const objContenedor = new Contenedor('./productos.txt');

const productsGet = async (req, res = response)=>{    // = response.. solo para que vscode reconozca metodos

    const allProducts = await objContenedor.getAll();

    res.status(200).json(allProducts);

}

const productGet = async (req, res)=>{

    const id = parseInt(req.params.id);

    const product = await objContenedor.getById(id);

    const theResponse = product ?? {error: 'Producto no encontrado'};

    res.status(200).json(theResponse);

}


const productsPost = async (req, res)=>{

    //console.log(req.body);
    const newProd = req.body;

    const addProd = await objContenedor.save(newProd);

    res.status(201).json({
        msg: 'POST new item',
        newProd,
        lastId: addProd

    })

}

const productsPut = (req, res)=>{

    const { id } = req.params;

    res.json({
        msg: "From put.. get this id"
    });

}

const productsDelete = (req, res)=>{

    res.json({msg:'delete products - api controller'});

}

module.exports = {
    productsGet,
    productGet,
    productsPost,
    productsPut,
    productsDelete
}