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
            prodId:{
                type: String
            },
            name: {
                type: String,
            },
            price:{
                type: Number,
            },
            cant:{
                type: Number,
            }
       }
    ]
});

const Order = model('Order', orderSchema);

module.exports = Order;