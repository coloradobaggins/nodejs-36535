const path = require('path');
const yargs = require('yargs/yargs')(process.argv.slice(2));
const express = require('express'); 
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const { dbConnection } = require('../database/config');
const passport = require('passport');
const { initializePassport } = require('../passport.config');

class Server{

    constructor(){

        const args = yargs.argv;
        

        //this.PORT = process.env.PORT || 8080;
        this.PORT = args.p || 8080; // (node app --p portNumber)

        console.log(`PORT: ${this.PORT}`);
        console.log(`args.p: ${args.p}`);

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
        hbs.registerPartials( path.join(__dirname, '..', 'views/partials') );
        


        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_CNN,
                mongoOptions: advancedOptions
            }),
            key: 'user_sid',
            secret: 'se-cre-to',
            resave: false,
            saveUninitialized: false,
            cookie: {maxAge: 600000}
            
        }));
                
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static('public'));
        initializePassport();                   //Ejecutar config de passport initialize y session()
        this.app.use(passport.initialize());    //Usamos passport
        this.app.use(passport.session());       //Ambas llamadas son necesarias para passsport

        

    }

    routes(){

        this.app.use('/', require('../routes/login.routes'));
        this.app.use('/dashboard', require('../routes/dashboard.routes'));
        this.app.use(this.productsRoutes, require('../routes/products.routes'));
        this.app.use('/info', require('../routes/info.routes'));
        this.app.use('/api/randoms', require('../routes/randoms.routes'));
    }

    listen(){

        this.app.listen(this.PORT, ()=>console.log('listening on port '+this.PORT));

    }

}



module.exports = Server;