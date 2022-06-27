const { response } = require('express');
const Contenedor = require('../models/Contenedor');


const objContenedor = new Contenedor('./productos.js');

const getProducts = (req, res = response)=>{

    res.send(`Hola desde get...!`);

}


const postProducts =(req, res)=>{

    res.send(`Hola desde POST...!`);

}   

module.exports = {
    getProducts,
    postProducts
}