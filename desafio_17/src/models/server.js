const express = require('express');
const dbConnection = require('../database/config');

class Server{
    
    constructor(){

        this.app = express();

        this.port = process.env.PORT || 3001;

        this.connectDB();

        this.middlewares();

        this.routes();

    }

    async connectDB(){

        await dbConnection();

    }

    middlewares(){

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static('public'));
        

    }

    routes(){

        this.app.use('/products', require('../routes/products.routes'));

    }

    listen(){

        this.app.listen(this.port, ()=> console.log(`Server listening on port ${this.port}`));
    
    }

}

module.exports = Server;