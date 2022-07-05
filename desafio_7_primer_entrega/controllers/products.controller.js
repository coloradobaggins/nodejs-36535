const Contenedor = require('../models/Contenedor');

const objContenedor = new Contenedor('db/productos.txt');

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

    body.timestamp = Date.now();

    try{

        await objContenedor.save(body);

    }catch(err){

        console.error(err);
    }

    res.json({
        status:"send"
    });

}

const productUpdate = async (req, res)=>{

    //const prodId    = parseInt(req.params.id);
    const prodId    = req.params.id;
    const prod      = req.body;

    let itemsResponse = [];

    try{    

        itemsResponse = await objContenedor.update(prodId, prod);

    }catch(err){
        console.log(err);
    }

    res.json({
        itemsResponse
    });

}

const productDelete = async (req, res)=>{

    const {id = null} = req.params;

    try{

        await objContenedor.deleteById(parseInt(id));


    }catch(err){

        console.log(err);
    }

    res.json({
        id
    });

}



module.exports = {  productsGet, 
                    productsPost,
                    productUpdate,
                    productDelete
                 };