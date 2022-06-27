const express = require('express');

class Server{

    constructor(){

        this.app = express();   //Express app

        this.port = 8080;
        this.productsRoutesPath = '/api/productos/';

        this.middlewares();

        this.routes();  

    }   

    middlewares(){

        //Json body read & parse (post, put, delete)
        this.app.use(express.json());

        //public dir
        this.app.use(express.static('public')); 

        this.app.use(express.urlencoded({ extendedparser : true }));

    }

    routes(){

        this.app.use(this.productsRoutesPath, require('../routes/products')); //middleware

    }

    listen(){
        this.app.listen(this.port, ()=>{

            console.log(`Server listening on port ${this.port}`);

        })
    }
}

module.exports = Server;