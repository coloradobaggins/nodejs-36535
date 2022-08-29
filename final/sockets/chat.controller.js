const chatSocketController = (socket) =>{

    console.log(`Cliente conectado ${socket.id}`);


    socket.on('disconnect', ()=>{
        console.log(`Cliente DESconectado ${socket.id}`);
    })

    socket.on('client-msg', (payload, callback)=>{

        console.log(`msg received!`);

        const id = 1234;

        callback(id);   //Feedback al cliente que me envio el msg (solo a el)
        
        //socket.emit('server-msg', payload);   //Solo envia el msg al cliente que me mando..
        
        socket.broadcast.emit('server-msg', payload);   //Envia a todos los sockets conectados.

    })

}

module.exports = { chatSocketController }