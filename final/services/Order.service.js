const { OrderMongoDB } = require('../models/OrderMongoDB');

class OrderService{

    constructor(){

    }


    async createOrder(objOrder){




    }
    /**
     * Recibe el body, enviado desde el carrito al finalizar la compra.
     * Devuelve array formatead con productos (objects ID ) y cantidad.
     * **Listo para agregar a array productos en el modelo de ordenes.**
     * @param {*} body 
     * @returns 
     */
    getProductAndCantArrayObj(body){

        console.log(`En order service`);
        console.log(body);

        let formattedObj = {}
        let prodArray = [];

        const prodId = body.prodId;
        const prodCant = body.cantProd;

        let isAnArray = Array.isArray(prodId);

        //Si solo tenemos 1 producto, solo tenemos una cantidad. Enviamos a hacer la orden de una.

        if(!isAnArray){
      
            const cant = parseInt(prodCant);
            console.log(`cant:::: ${cant}`);

            formattedObj = {
                product: prodId,
                cant
            }
            prodArray.push(formattedObj);
            
        }else{

            prodId.forEach((idProd, i) => {
            
                formattedObj = {
                    product: idProd,
                    cant: parseInt(prodCant[i])
                }

                prodArray.push(formattedObj);

            });

        }

        return prodArray;
    }

}

module.exports = OrderService;