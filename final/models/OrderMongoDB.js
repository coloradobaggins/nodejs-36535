const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB');
const Order = require('./Order');

class OrderMongoDB extends ContenedorMongoDB {

    constructor(){
        super(Order);
    }

    async createOrder(orderObj){

        console.log(`Creando orden`)

        //User
        //productos []

        console.log(`Nos llega el obj para orden: `);
        console.log(orderObj);

        this.save(orderObj);

    }

}

module.exports = { OrderMongoDB };