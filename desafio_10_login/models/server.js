const express = require('express'); 
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const { dbConnection } = require('../database/config');

class Server{

    constructor(){

        this.PORT = process.env.PORT || 8080;
        this.app = express();

        this.connectDB();
        
        this.middlewares();

        this.routes();

    }

    async connectDB(){

        await dbConnection();

    }

    middlewares(){

        this.app.set('view engine', 'hbs');
        //hbs.registerPartials(__dirname + '/views/partials', function(err){console.log(err)})

        
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static('public'));


        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_CNN,
                mongoOptions: advancedOptions
            }),
            //key: 'user_sid',
            secret: 'se-cre-to',
            resave: true,
            saveUninitialized: false,
            cookie: {maxAge: 120000}
            
        }));

    }

    routes(){

        this.app.use('/', require('../routes/login.routes'));
        this.app.use('/dashboard', require('../routes/dashboard.routes'));
    }

    listen(){

        this.app.listen(this.PORT, ()=>console.log('listening on port '+this.PORT));

    }

}



module.exports = Server;