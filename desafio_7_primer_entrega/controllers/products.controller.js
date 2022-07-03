const Contenedor = require('../models/Contenedor');

const objContenedor = new Contenedor('productos.txt');

const productsGet = async (req, res)=>{

    const { id = null } = req.params;

    console.log(id);

    let prods = [];
    
    if(id === null){

        try{

            prods = await objContenedor.getAll();
    
        }catch(err){
            console.error(err);
        }

    }else{

        try{

            prods = await objContenedor.getById(id)

        }catch(err){

            console.error(err);
        }

    }
    
    
    res.json({
        prods
    })

}


const productsPost = async (req, res)=>{

    const body = req.body;

    const newProd = body;

    try{

        await objContenedor.save(body);

        res.json({
            body
        });

    }catch(err){

        console.error(err);
    }

    

}

const productDelete = async (req, res)=>{

    const {id = null} = req.params;

    try{

        await objContenedor.deleteById(parseInt(id));

        res.json({
            id
        });
    

    }catch(err){

        console.log(err);
    }

}



module.exports = {  productsGet, 
                    productsPost, 
                    productDelete
                 };