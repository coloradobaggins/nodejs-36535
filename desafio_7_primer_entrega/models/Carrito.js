const Contenedor = require('../models/Contenedor');

class Carrito extends Contenedor{

    constructor(fileName){
        super(fileName);
    }

    /**
     * Crea estructura carrito.
     * Puede ser carrito con o sin productos.
     * Agregar campo timestamp
     * @param {obj} cartObj 
     * @returns 
     */
    async createCart(cartObj){

        cartObj.timestamp = Date.now();

        if(!cartObj.hasOwnProperty("productos")){   //Si no envian el array con productos (al menos vacio), lo creo
            cartObj.productos = [];
        }

        //console.log(cartObj);

       return this.save(cartObj);

    }

    /**
     * Borra carrito x id
     * @param {*} id carrito a eliminar
     */
    async deleteCartById(id){

        //const getAllCart = await this.getAll();

        this.deleteById(id);

    }

    async getProdsFromCart(idCarro){

        try{

            //const allItems = await this.getAll();
            const filteredById = await this.getById(idCarro);
            /*
            console.log(filteredById);
            console.log('********');
            console.log(filteredById.productos);
            */
            return filteredById.productos;

        }catch(err){
            throw `Error${err}`;
        }

    }

    async addProdsToCart(cartId, prods){
        
        

        console.log(`On carrito...`);
        console.log(`cartId: ${cartId}`);
        console.log(`### prod to add ###`);
        console.log(prods);
        console.log(`### ########## ###`);
        console.log(`Existe carrito id ${cartId}?`);

        const cart = await this.getById(cartId);

        if(cart!== null){
            
            console.log(`Tenemos carrito con id ${cartId}`);

            let allCart = await this.getAll();


            let foundCarritoIndex = allCart.findIndex((item)=> item.id == cartId);


            console.log(`foundIndex: ${foundCarritoIndex}`);

            
            if(!allCart[foundCarritoIndex].hasOwnProperty("productos")){
                throw `Este carrito no tiene la propiedad productos definida`;
            }


            allCart[foundCarritoIndex].productos.push(prods);

            await this.__writeFile(JSON.stringify(allCart, null, 2));

        }else{
            throw `No existe el carrito con id ${cartId}`;
        }
        
    }

}

module.exports = Carrito;