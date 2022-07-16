const { Schema, model } = require('mongoose');


const carritoSchema = new Schema({
    /*
    productos: {
        type: Array,
        required: true,
        default: []
    },*/
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    }],
    timestamp: {
        type: Number,
        required: true
    }

});

module.exports = model('Carrito', carritoSchema);