const { response } = require('express');

const Contenedor = require('../models/ContenedorDB');

const objContenedor = new Contenedor('./productos.txt');

const getProducts = async (req, res = response)=>{

    try{

        const allProd = await objContenedor.getAll();

        res.render('getProducts', {prods: allProd});

        //res.status(200).json(allProd);
    }catch(err){
        console.log(err);
    }

    
}


const postProducts = (req, res)=>{

    console.log(`post`);
    res.status(201).send('ok, post');

}


module.exports = { getProducts, postProducts };