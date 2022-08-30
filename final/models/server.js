const path = require('path');
const express = require('express'); 
const cors = require('cors');
const passport = require('passport');
const { initializePassport } = require('../passport.config');
const hbs = require('hbs');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const { dbConnection } = require('../database/config');
const { loggers } = require('../utils/logger');
const { chatSocketController } = require('../sockets/chat.socket.controller');

class Server{

    constructor(){

        this.PORT = process.env.PORT || 8080;

        this.app = express();

        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);    //Toda la informacion de los sockets conectados estan aca.

        this.paths = {
            login:          '/login',
            logout:         '/logout',
            signup:         '/signup',
            dashboard:      '/dashboard',
            info:           '/info',
            profile:        '/profile',
            shop:           '/shop',
            chat:           '/chat', 
            checkuot:       '/checkuot',
            file_upload:    '/file_upload',
            products:       '/api/productos',
            cart:           '/api/carrito'
        }

        this.connectDB();

        this.middlewares();

        this.routes();

        this.sockets();

    }


    async connectDB(){

        await dbConnection();

    }

    middlewares(){

        this.app.set('view engine', 'hbs');
        this.app.set('/' ,path.join(__dirname, '/views'));
        hbs.registerPartials( path.join(__dirname, '..', 'views/partials') );
        
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: false
        }));

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

        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static('public'));
        initializePassport();                   //Ejecutar config de passport initialize y session()
        this.app.use(passport.initialize());    //Usamos passport
        this.app.use(passport.session());       //Ambas llamadas son necesarias para passsport
        
        //Logger
        /*
        this.app.use((req, res, next)=>{

            
            loggers.infoLogger.info(`Url: ${req.originalUrl}, Method: ${req.method}`);

            next();

        });
        */

    }

    routes(){
        
        this.app.use(this.paths.login, require('../routes/login.routes'));
        this.app.use(this.paths.logout, require('../routes/logout.routes'));
        this.app.use(this.paths.signup, require('../routes/signup.routes'));
        this.app.use(this.paths.dashboard, require('../routes/dashboard.routes'));
        this.app.use(this.paths.products, require('../routes/products.routes'));    //Produts: /api/productos
        this.app.use(this.paths.cart, require('../routes/cart.routes'));            //Cart: api/carrito
        this.app.use(this.paths.info, require('../routes/info.routes'));
        this.app.use(this.paths.profile, require('../routes/profile.routes'));
        this.app.use(this.paths.shop, require('../routes/shop.routes'));
        this.app.use(this.paths.checkuot, require('../routes/checkout.routes'));
        this.app.use(this.paths.file_upload, require('../routes/fileUpload.routes'));
        this.app.use(this.paths.chat, require('../routes/chat.routes'));
        this.app.use('*', require('../routes/notfound.routes'));
    }

    sockets(){
        
        this.io.on('connection', chatSocketController);

    }


    listen(){

        //this.app.listen(this.PORT, ()=>console.log(`Server listening on port ${this.PORT}`)); //El server de express no tiene nada de sockets.
        this.server.listen(this.PORT, ()=>console.log(`Server listening on port ${this.PORT}`));

    }

}



module.exports = Server;