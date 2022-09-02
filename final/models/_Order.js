const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
   
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //productos:[]
    productos: [
        {
            product:{ 
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            cant: { 
                type: Number, 
                required: true 
            } 
        }
    ]
});

const Order = model('Order', orderSchema);

module.exports = Order;