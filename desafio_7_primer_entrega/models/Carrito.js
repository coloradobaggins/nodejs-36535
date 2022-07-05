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

    /**
     * Buscar los productos de un carrito.
     * Devuelve un array si hay productos. Sino, null.
     * @param {int} idCarro 
     * @returns array | null
     */
    async getProdsFromCart(idCarro){

        try{

            //const allItems = await this.getAll();
            const filteredById = await this.getById(idCarro);
            /*
            console.log(filteredById);
            console.log('********');
            console.log(filteredById.productos);
            */
            let prods = filteredById.productos;
            return (prods.length !== 0) ? prods : null;

        }catch(err){
            throw `Error${err}`;
        }

    }
    /**
     * Recibe objeto producto
     * @param {int} cartId 
     * @param {obj} prod
     * @returns 
     */
    async addProdsToCart(cartId, prods){
        
        const cart = await this.getById(cartId);

        let prodAdded = false;

        if(cart!== null){
            
            let allCart = await this.getAll();

            let foundCarritoIndex = allCart.findIndex((item)=> item.id == cartId);
            
            if(!allCart[foundCarritoIndex].hasOwnProperty("productos")){
                throw `Este carrito no tiene la propiedad 'productos' definida`;
            }   

            
            
            let carritoProds = allCart[foundCarritoIndex].productos;
            
            let existProduct = carritoProds.some(p=>p.id === prods.id);     //Check si ya existe este producto en este carrito por su id..

            console.log(`Existe en este carrito id ${cartId} el producto?? : ${existProduct}`);

            if(!existProduct){
                
                allCart[foundCarritoIndex].productos.push(prods);

                await this.__writeFile(JSON.stringify(allCart, null, 2));

                prodAdded = true;

            }else{
                throw `El producto con ese id ya existe en este carrito`;
            }


        }else{
            throw `No existe el carrito con id ${cartId}`;
        }
        
        return prodAdded;
    }

    /**
     * Busca todos los los carritos del .txt
     * Filtra el carrito, filtra los productos, obtiene el indice del buscado.
     * Elimina.
     * @param {*} cartId 
     * @param {*} prodId 
     * @returns true | false si borra o no el producto
     */
    async deleteProdFromCart(cartId, prodId){

        let prodDeleted = false;

        let cart = await this.getById(cartId);  

        if(cart!=null){   //Check si tenemos cart con este id

            let prods = await this.getProdsFromCart(cartId);
            
            if(prods != null){

                let allCart = await this.getAll();

                let filteredCart = allCart.find(cart=> cart.id ==cartId);

                let cartProds = filteredCart.productos;

                console.log(cartProds);

                let foundProdIndex = cartProds.findIndex(p=>p.id===prodId);

                if(foundProdIndex > -1){

                    cartProds.splice(foundProdIndex, 1);

                    await this.__writeFile(JSON.stringify(allCart, null, 2));

                    prodDeleted = true;

                }else{
                    
                    throw `prod index no encontrado`;

                }

            }else{
                throw `Carrito sin productos`;
            }
            
        }else{
            throw `Este carrito esta vacio`;
        }

        return prodDeleted;
    }

}

module.exports = Carrito;