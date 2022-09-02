const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB');
const Order = require('./Order');

class OrderMongoDB extends ContenedorMongoDB {

    constructor(){
        super(Order);
    }

    async createOrder(orderObj){

        console.log(`Creando orden`)


        this.save(orderObj);

    }

    async getOrdersByUserId(userId){

        return await Order.find({user: userId}).populate('user');

    }

    async getProductsFromOrder(orderId){

        return await Order.findOne({_id: orderId}).populate('productos');

    }


}

module.exports = { OrderMongoDB };