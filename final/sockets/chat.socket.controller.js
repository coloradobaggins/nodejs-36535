const request = require('express');
const MessageMongoDB = require('../models/MessageMongoDB');

const objMessageMongoDB = new MessageMongoDB();

const chatSocketController = (socket) =>{

    console.log(`Cliente conectado ${socket.id}`);


    socket.on('disconnect', ()=>{
        console.log(`Cliente DESconectado ${socket.id}`);
    })

    socket.on('client-msg', async (payload, callback)=>{

        console.log(`msg received!`);
        console.log(payload);

        await objMessageMongoDB.save(payload);

        const id = 1234;

        callback(id);                                   //Feedback al cliente que me envio el msg (solo a el)
        
        //socket.emit('server-msg', payload);           //Solo envia el msg al cliente que me mando..
        
        socket.broadcast.emit('server-msg', payload);   //Envia a todos los sockets conectados.

    })

}

module.exports = { chatSocketController }