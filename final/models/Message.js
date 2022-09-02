const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({

    date:{
        type: String,
        required: [true, 'La fecha es obligatoria']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    subject:{
        type: String
    },
    comments: {
        type: String,
        required: [true, 'El comentario es obligatorio']
    }

})

const Message = model('Message', MessageSchema);

module.exports = Message;