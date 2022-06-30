const express = require('express');
const http = require('http');


class Server{

    constructor(){

        this.app    = express();
        this.port   = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io     = require('socket.io')(this.server);    //Toda la info de los sockets/clientes conectados

        this.productsRoutes = '/productos/';

        this.templateEngine();

        this.middlewares();

        this.routes();

        this.sockets();

    }

    templateEngine(){

        this.app.set('view engine', 'hbs');

    }

    middlewares(){

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use( express.static('public'));

    }

    routes(){

        this.app.use(this.productsRoutes, require('../routes/products.routes'));

    }

    sockets(){

        this.io.on('connection', (socket)=>{

            console.log(`socket (client) connected (${socket.id})`);

            socket.on('disconnect', ()=>{

                console.log(`** socket DISconnected (${socket.id}) **`);

            });

            socket.on('front-msg', (payload)=>{

                console.log(payload);

                //From server to all cients (this.io.emit())
                this.io.emit('server-msg', payload);

            })

        })

    }


    listen(){

        //this.app.listen(this.port, ()=>{
        this.server.listen(this.port, ()=>{

            console.log(`Server listening on port ${this.port}`);

        })

    }

}

module.exports = Server;