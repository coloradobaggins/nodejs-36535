const { response } = require('express');
const Contenedor = require('../models/Contenedor');


const objContenedor = new Contenedor('./productos.txt');

const getProducts = async (req, res = response)=>{

    //res.send(`Hola desde get...!`);

    try{

        const allProd = await objContenedor.getAll();

        console.log(allProd);

        res.render('getProducts');

    }catch(err){

        console.log(err);

    }

    

}


const postProducts = async (req, res)=>{

    const newProd = req.body;
    console.log(newProd);
    
    try{

        await objContenedor.save(newProd);

    }catch(err){
        console.log(err)
    }
    
    res.redirect('/');
}   

module.exports = {
    getProducts,
    postProducts
}