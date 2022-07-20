const express = require('express');
const http = require('http');
const socketController = require('../sockets/socket.controller');


class Server{

    constructor(){

        this.app    = express();
        this.port   = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io     = require('socket.io')(this.server);    //Toda la info de los sockets/clientes conectados

        this.productsRoutes = '/productos/';
        this.productsTestRoutes = '/api/productos-test/';
        

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
        this.app.use(this.productsTestRoutes, require('../routes/products_test.routes'));

    }

    sockets(){

        this.io.on('connection', socketController);

    }


    listen(){

        this.server.listen(this.port, ()=>{

            console.log(`Server listening on port ${this.port}`);

        })

    }

}

module.exports = Server;