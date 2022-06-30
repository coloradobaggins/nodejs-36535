const Contenedor = require('../models/Contenedor');

const objContenedor = new Contenedor('./mensajes.txt');
/*
const today = new Date();
const yyyy  = today.getFullYear();
let mm      = today.getMonth();
let dd      = today.getDate();
*/

const socketController = (socket)=>{

    console.log(`socket (client) connected (${socket.id})`);

    socket.on('disconnect', ()=>{
        console.log(`** socket DISconnected (${socket.id}) **`);
    });



    socket.on('front-msg', async (payload, callback)=>{           //Callback opcional

        //console.log(payload);

        const id = 123;                                     //Por ej.: Enviar cuando ya grabe en mi modelo..
        callback(id);

        try{

            await objContenedor.save(payload);
            

        }catch(err){
            console.log(err);
        }
        
        socket.broadcast.emit('server-msg', payload);       // == this.io.emit('server-msg', payload);

    });

}

module.exports = socketController;