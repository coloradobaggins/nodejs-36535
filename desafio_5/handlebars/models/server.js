const express = require('express');

class Server{

    constructor(){

        this.app = express();

        this.port = 8080;
        this.productsRoutes = '/productos/';

        this.middlewares();

        this.routes();
    }

    middlewares(){

        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({extended: true}));

    }

    routes(){

        this.app.use(this.productsRoutes, require('../routes/products'));

    }

    listen(){

        this.app.listen(this.port, ()=>{

            console.log(`Server listening on port ${this.port}`);

        });

    }

}

module.exports = Server;