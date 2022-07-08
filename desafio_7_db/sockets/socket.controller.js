require('dotenv').config();
const {mariaDBOptions} = require('../options/mariaDB');
const {SQLite3Options} = require('../options/SQLite3');
const knexMARIA = require('knex')(mariaDBOptions);
const knexSQLite3 = require('knex')(SQLite3Options);

const ContenedorDB = require('../models/ContenedorDB');

//const objMsgContenedor = new ContenedorDB('./mensajes.txt');
const objMsgContenedor = new ContenedorDB(knexSQLite3, 'mensajes');
const objProdContenedor = new ContenedorDB(knexMARIA, 'productos');

const socketController = (socket)=>{

    console.log(`socket (client) connected (${socket.id})`);

    socket.on('disconnect', ()=>{
        console.log(`** socket DISconnected (${socket.id}) **`);
    });


    socket.on('front-msg', async (payload, callback)=>{           //Callback opcional

        //console.log(payload);

        const received = true;                                     //Por ej.: Enviar cuando ya grabe en mi modelo..
        callback(received);

        try{

            await objMsgContenedor.save(payload);

            socket.broadcast.emit('server-msg', payload);       // == this.io.emit('server-msg', payload);


            let allStoredMsgs = await objMsgContenedor.getAll();

            console.log(allStoredMsgs);

        }catch(err){
            console.log(err);
        }


    });

    socket.on('get-prods-onload', async(payload, callback)=>{

        try{

            let prods = await objProdContenedor.getAll();

            callback(prods);

        }catch(err){

            console.log(err);

        }

    });

    socket.on('add-product', async(payload, callback)=>{

        try{

            await objProdContenedor.save(payload);

            const allProds = await objProdContenedor.getAll();

            socket.broadcast.emit('server-prod-added', allProds);

            const received = true;
            callback(received);

        }catch(err){

            console.log(err);

        }

    });

}

module.exports = socketController;