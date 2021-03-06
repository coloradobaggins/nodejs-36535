const express = require('express');
//const hbs = require('hbs');

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

        // Handlebars
        this.app.set('view engine', 'hbs');
        //hbs.registerPartials(__dirname + '/views/partials', function (err) {console.log(`Error loading partials.. ${err}`)});

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

        });
        
    }

    listen(){

        this.app.listen(this.port, ()=>{

            console.log(`Server listening on port ${this.port}`);

        });

    }

}

module.exports = Server;