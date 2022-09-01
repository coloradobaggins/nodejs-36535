const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
   
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productos:[
        {
            product: {
                type: Object,
                required: true
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