const { response } = require('express');

//Finalmente, los productos van por socket...
//Dejo la estructura del controller

const getProducts = async (req, res = response)=>{

    console.log(`get`);
    res.status(200).send('ok, get');
    
}


const postProducts = (req, res)=>{

    console.log(`post`);
    res.status(201).send('ok, post');

}



module.exports = { getProducts, postProducts };