const express = require('express');

class Server{

    constructor(){
        
        this.app    = express();
        this.port   = process.env.PORT;

        this.productsRoute      = '/api/productos';
        this.shoppingCartRoute  = '/api/carrito';

        this.middlewares();

        this.routes();
    }

    middlewares(){

        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

    }

    routes(){

        this.app.use(this.productsRoute, require('../routes/products.rutes'));
        this.app.use(this.shoppingCartRoute, require('../routes/shoppingCart.routes'));

    }

    listen(){
        this.app.listen(this.port, ()=>{

            console.log(`Server listening on port ${this.port}`);

        });
    }

}

module.exports = Server;