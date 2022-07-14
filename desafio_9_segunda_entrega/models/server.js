const express = require('express');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.productsRoutes = '/api/productos';
        this.cartRoutes = '/api/carrito';

        this.middlewares();

        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    routes(){

        this.app.use(this.productsRoutes, require('../routes/products.routes'));
        //this.app.use(this.cartRoutes, require('../routes/cart.routes'));
        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Listening on ${this.port}`);
        })
    }
}

module.exports = Server;