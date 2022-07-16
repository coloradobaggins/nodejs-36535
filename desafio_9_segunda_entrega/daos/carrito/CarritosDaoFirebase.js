const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');

class CarritosDaoFirebase extends ContenedorFirebase{

    constructor(){
        super('carts');
    }

    async createCart(cartObj){

        cartObj.timestamp = Date.now();

        if(!cartObj.hasOwnProperty('productos')){
            cartObj.productos = [];
        }

        return await this.save(cartObj);

    }

    async deleteCartById(cartId){

        return await this.deleteById(cartId);

    }

    async getProdsFromCart(cartId){

        return await this.getById(cartId);

    }

    async addProdsToCart(cartId, newProd){
        
        let prodAdded = false;

        let cart = await this.getProdsFromCart(cartId);
        let cartProds = cart.productos;

        let prodIdExists = cartProds.some(p=> p.id === newProd.id)

        if(!prodIdExists){

            cartProds.push(newProd);
            
            let update = await this.update(cartId, cart);

            if(update=='updated') prodAdded = true;

        }

        return prodAdded;

    }

    /**
     * Firestore al agregar producto y carrito crea un id string para cada uno.
     * Para eliminar los necesitamos aca.
     * @param {String} cartId 
     * @param {String} prodId 
     * @returns 
     */
    async deleteProdFromCart(cartId, prodId){

        let prodRemoved = false;

        let cart = await this.getById(cartId);
        let cartProds = cart.productos;

        let prodIdExists = cartProds.some(p=> p.id === prodId);

        if(prodIdExists){

            //Buscar el indice a eliminar
            var indexToRemove = cartProds.map(p=> p.id).indexOf(prodId);
            
            cartProds.splice(indexToRemove, 1);
            
            console.log(`Indice a borrar: ${indexToRemove}`);

            let updated = await this.update(cartId, cart);

            if(updated=='updated') prodRemoved = true;
        }

        return prodRemoved;

    }

}

module.exports = CarritosDaoFirebase;