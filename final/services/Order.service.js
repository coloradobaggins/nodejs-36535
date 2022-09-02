const { OrderMongoDB } = require('../models/OrderMongoDB');

class OrderService{

    constructor(){

    }


    async createOrder(objOrder){

        const orderMongoDB = new OrderMongoDB();

        try{

            const result = await orderMongoDB.createOrder(objOrder);
            return result;

        }catch(err){
            console.log(err);
        }

    }

    /**
     * Recibe el body, enviado desde el carrito al finalizar la compra.
     * Devuelve array formatead con objetos con los datos del modelo producto.
     * **Listo para agregar a array productos en el modelo de ordenes.**
     * @param {*} body 
     * @returns 
     */
    getProductAndCantArrayObj(body){

        let formattedObj = {}
        let prodArray   = [];

        const prodId    = body.prodId;
        const prodName  = body.prodName;
        const prodPrice = body.prodPrice;
        const prodCant  = body.cantProd;

        const isAnArray = Array.isArray(prodId);

        //Si solo tenemos 1 producto, solo tenemos una cantidad. Enviamos a hacer la orden de una.

        if(!isAnArray){
      
            const cant = parseInt(prodCant);
            const price = parseInt(prodPrice);

            formattedObj = {
                prodId: prodId,
                name: prodName,
                price,
                cant
            }
            prodArray.push(formattedObj);
            
        }else{

            prodId.forEach((idProd, i) => {
            
                formattedObj = {
                    prodId: idProd,
                    name: prodName[i],
                    price: parseInt(prodPrice[i]),
                    cant: parseInt(prodCant[i])
                }

                prodArray.push(formattedObj);

            });

        }

        return prodArray;
    }

    async getOrdersByUser(userId){


        const orderMongoDB = new OrderMongoDB();
        
        const orders = await orderMongoDB.getOrdersByUserId(userId)
        return orders;
    }
    

    async getProductsFromOrder(){


        const orderMongoDB = new OrderMongoDB();

    }


}

module.exports = OrderService;