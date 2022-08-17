const {Schema, model } = require('mongoose');

const ProductSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
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

const Product = model('Product', ProductSchema);

module.exports = Product;