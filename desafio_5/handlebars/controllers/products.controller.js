const { response } = require('express');
const Contenedor = require('../models/Contenedor');


const objContenedor = new Contenedor('./productos.txt');

const getProducts = async (req, res = response)=>{

    try{

        const allProd = await objContenedor.getAll();

        res.render('getProducts', {
            prods: allProd
        });

    }catch(err){

        console.log(err);

    }

    

}


const postProducts = async (req, res)=>{

    const newProd = req.body;
    console.log(newProd);
    
    try{

        await objContenedor.save(newProd);
        res.redirect('/');

    }catch(err){
        console.log(err)
    }
    
}   

module.exports = {
    getProducts,
    postProducts
}