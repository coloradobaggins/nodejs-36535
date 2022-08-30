const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB');
const Message = require('./Message');

class MessageMongoDB extends ContenedorMongoDB {

    constructor(){
        super(Message);
    }

}

module.exports = MessageMongoDB;