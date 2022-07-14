const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');

class CarritosDaoArchivos extends ContenedorArchivo{

    constructor(){

        const dbFileName = process.env.FILE_DB_CARRITO || 'carrito.txt';

        super('database/db_files/'+dbFileName);
    }

    /**
     * Obj esperado:
     * Si no se envia obj, se crea carrito con productos [].
     * {
            "productos":[
                { 
                    "name": "ej",
                    "description": "desc ej",
                    "code": int,
                    "price": "",
                    "stock": int,
                    "thumbnail": "",
                    "timestamp": date.Now(),
                    "id": int
                }
            ]
        }
     *
     * 
     * @param {Obj} cartObj 
     * @returns id carrito creado
     */
    async createCart(cartObj){

        cartObj.timestamp = Date.now();

        if(!cartObj.hasOwnProperty('productos')){   //Si crean un carrito sin productos, creo productos []
            cartObj.productos = [];
        }

        return await this.save(cartObj);

    }

    async getProdsFromCart(id){

        return await this.getById(id);
        
    }

    async deleteCartById(id){

        await this.deleteById(id);

    }

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

}

module.exports = CarritosDaoArchivos;