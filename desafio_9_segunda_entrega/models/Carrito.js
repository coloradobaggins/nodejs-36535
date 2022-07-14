const { Schema, model } = require('mongoose');

const carritoSchema = new Schema({

    products: {

    },
    timestamp: {
        type: Number,
        required: true
    }

});

module.exports = model('Carrito', carritoSchema);