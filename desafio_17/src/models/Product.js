const { Schema, model } = require('mongoose');

const productSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    description:{
        type: String
    },
    code: {
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    stock:{
        type: Number,
        required: [true, 'El stock es obligatorio']
    },
    thumbnail:{
        type: String
    },
    timestamp:{
        type: Number
    }

});

module.exports = model('Product', productSchema);