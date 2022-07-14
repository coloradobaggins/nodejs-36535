const { Schema, model } = require('mongoose');

const productSchema = new Schema({

    name: {
        type: String,
        required: true
    }, 
    description:{
        type: String
    },
    code: {
        type: Number
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    thumbnail:{
        type: String
    },
    timestamp:{
        type: Number
    }

});

module.exports = model('Product', productSchema);