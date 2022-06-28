const express = require('express');

class Server{
    
    constructor(){

        this.app = express();
        this.port = 8080;
        this.productsRoutes = '/productos/';

        this.templateEngine();
        this.middlewares();
        this.routes();

    }

    templateEngine(){

        this.app.set('view engine', 'ejs');

    }

    middlewares(){

        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({extended: true}));

    }

    routes(){

        this.app.use(this.productsRoutes, require('../routes/products'));

        this.app.use('*', (req, res)=>{
            res.render('not-found');
        })

    }

    listen(){

        this.app.listen(this.port, ()=>{

            console.log(`Server litening on port ${this.port}`);

        })

    }



}

module.exports = Server;