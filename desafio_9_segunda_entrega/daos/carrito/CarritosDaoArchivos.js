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

        return await this.getById(parseInt(id));
        
    }

    async deleteCartById(id){

        await this.deleteById(parseInt(id));

    }

    async addProdsToCart(cartId, prods){

        cartId = parseInt(cartId);

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

    async deleteProdFromCart(cartId, prodId){
        cartId = parseInt(cartId)
        prodId = parseInt(prodId);

        let prodDeleted = false;

        let cart = await this.getById(cartId);  

        if(cart!=null){   //Check si tenemos cart con este id

            let prods = await this.getProdsFromCart(cartId);
            
            if(prods != null){

                let allCart = await this.getAll();

                let filteredCart = allCart.find(cart=> cart.id ==cartId);

                let cartProds = filteredCart.productos;

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

module.exports = CarritosDaoArchivos;