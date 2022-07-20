const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    author:{
        id: {
            type: String,
            required: [true, 'id(mail) es obligatorio']
        },
        nombre: {
            type: String
        },
        apellido: { 
            type: String
        },
        edad: { 
            type: Number,
            default: 0
        },
        alias: { 
            type: String
        },
        avatar: { 
            type: String 
        }
    },
    fecha:{
        type: String
    },
    text: {
        type: String
    }
});

//module.exports = model('Mensaje', messageSchema);

const Mensaje = model( 'Mensaje', messageSchema);

module.exports =  {Mensaje}