const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    timestamp:{
        type: Number,
        required: true
    }
});

const Cart = model('Cart', cartSchema);

module.exports =  Cart;