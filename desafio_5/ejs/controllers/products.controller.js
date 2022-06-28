const Contenedor = require('../models/Contenedor');

const objContenedor = new Contenedor('./productos.txt');

const getProducts = async (req, res)=>{

    console.log(`Estamos en EJS, GET`);

    try{

        const allProduct = await objContenedor.getAll();

        console.log(allProduct);

        res.render('getProducts',{
            prods: allProduct
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
        console.log(err);
    }

}

module.exports = { getProducts, postProducts };