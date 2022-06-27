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

    
    const newProd = req.body;

    //console.log(req.body);
    
    const addProd = await objContenedor.save(newProd);

    res.status(201).json({
        msg: 'POST new item',
        newProd,
        lastId: addProd

    })
    
}

const productsPostFront = async (req, res)=>{

    console.log(`post front..`);

    const newProd = req.body;

    //console.log(req.body);
    
    const addProd = await objContenedor.save(newProd);

    res.status(201).json({
        msg: 'POST new item from form',
        newProd,
        lastId: addProd
    })

}

const productsPut = async (req, res)=>{

    const { id } = req.params;

    const newProd = req.body;

    

    let theProd = await objContenedor.update(id, newProd);

    res.json({
        msg: "From put.. get this id",
        theProd
    });

}

const productsDelete = async (req, res)=>{

    const id = parseInt(req.params.id);

    let prodDelete = await objContenedor.deleteById(id);

    res.status(200).json({
        msg:'Delete prod by id',
        idDelete: id,
        prodDelete
    });

}

module.exports = {
    productsGet,
    productGet,
    productsPost,
    productsPostFront,
    productsPut,
    productsDelete
}