const express = require('express'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const { dbConnection } = require('../database/config');
const passport = require('passport');
const { initializePassport } = require('../passport.config');

class Server{

    constructor(){

        this.PORT = process.env.PORT || 8080;
        this.app = express();

        this.productsRoutes = '/api/productos';

        this.connectDB();

        this.middlewares();

        this.routes();

    }

    async connectDB(){

        await dbConnection();

    }

    middlewares(){

        this.app.set('view engine', 'hbs');

        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_CNN,
                mongoOptions: advancedOptions
            }),
            key: 'user_sid',
            secret: 'se-cre-to',
            resave: false,
            saveUninitialized: false,
            cookie: {maxAge: 920000}
            
        }));
                
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static('public'));
        initializePassport();   //Ejecutar config de passport initialize y session()
        this.app.use(passport.initialize());    //Usamos passport
        this.app.use(passport.session());       //Ambas llamadas son necesarias para passsport

        

    }

    routes(){

        this.app.use('/', require('../routes/login.routes'));
        this.app.use('/dashboard', require('../routes/dashboard.routes'));
        this.app.use(this.productsRoutes, require('../routes/products.routes'))
    }

    listen(){

        this.app.listen(this.PORT, ()=>console.log('listening on port '+this.PORT));

    }

}



module.exports = Server;