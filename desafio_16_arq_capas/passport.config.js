const passport = require('passport');
const local = require('passport-local');
const User = require('./models/User');
const { createHash, isValidPass } = require('./utils/passUtils');

const LocalStrategy = local.Strategy;

const initializePassport = ()=>{

    //Passport middleware para registro de usuario
    passport.use(
        'signup',  //Nombre de la config
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done)=>{    //Funcion que debemos usar en passport.

                const {email } = req.body;

                try{

                    //Buscar en db si existe, antes de registrar al user
                    let user = await User.findOne({username: username});
                    if(user) return done(null, false);  //Si ya existe este user registrado, enviamos false al server

                    const newUser = {
                        username,
                        email,
                        password
                    }      
                    
                    //Creacion de user
                    try{

                        let result = await User.create(newUser);
                        return done(null, result)//Devolvemos al server el resultado de la creacion

                    }catch(err){
                        console.log(err)
                        done(err);
                    }

                }catch(err){
                    console.log(err);
                    done(err);
                }

            }
        )
    );

    //Passport middleware para Login

    passport.use(
        'login',
        new LocalStrategy(
            async (username, password, done)=>{

                try{

                    let user = await User.findOne({username: username});    //Buscar en db
                    
                    if(!user) return done(null, false), {message: "Usuario no existe"};
                    if(!isValidPass(user, password)) return done(null, false, {message: "Contraseña Invalida"})

                    return done(null, user);

                }catch(err){
                    console.log(err);
                    done(err);
                }

            }
        )
    )

    passport.serializeUser((user, done)=>{  //Passport sabe que user es por su id
        
        done(null, user._id)

    });

    passport.deserializeUser((id, done)=>{  //Passport Obtiene todos los datos a partir del id.

        User.findById(id, done);

    });

}

module.exports = {initializePassport};