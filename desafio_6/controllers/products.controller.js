const { response } = require('express');

const getProducts = (req, res = response)=>{
    
    res.status(200).send('estamos');

}

const postProducts = (req, res)=>{

    console.log(`post`);
    res.status(201).send('ok, post');

}

module.exports = { getProducts, postProducts };