const Contenedor = require('../models/Contenedor');

const objMsgContenedor = new Contenedor('./mensajes.txt');

const objProdContenedor = new Contenedor('./productos.txt');

const socketController = (socket)=>{

    console.log(`socket (client) connected (${socket.id})`);

    socket.broadcast.emit('hola,iniciamos!');

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

            socket.broadcast.emit('server-prod-added', payload);

            const received = true;
            callback(received);

        }catch(err){

            console.log(err);

        }

    });

}

module.exports = socketController;