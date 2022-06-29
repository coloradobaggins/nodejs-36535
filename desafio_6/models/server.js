const express = require('express');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.productsRoutes = '/productos/';

        this.middlewares();

        this.routes();
    }

    middlewares(){

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use( express.static('public'));

    }

    routes(){

        this.app.use(this.productsRoutes, require('../routes/products.routes'));

    }

    listen(){

        this.app.listen(this.port, ()=>{

            console.log(`Server listening on port ${this.port}`);

        })

    }

}

module.exports = Server;