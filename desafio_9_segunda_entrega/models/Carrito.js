const { Schema, model } = require('mongoose');

const carritoSchema = new Schema({

    productos: {
        type: Array,
        required: true,
        default: []
    },
    timestamp: {
        type: Number,
        required: true
    }

});

module.exports = model('Carrito', carritoSchema);