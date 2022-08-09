const User = require('../models/User');

const getSignup = (req, res)=>{

    if(req.isAuthenticated()){

        res.redirect('/dashboard');

    }else{

        res.render('signup');

    }
    
}


const postSignup = (req, res) => {

    res.redirect('/login');

}

const failSignup = (req, res) =>{

    res.render('errors/failSignup', {errorMsg: 'Usuario ya registrado'})

}

const getLogin = (req, res)=>{

    res.render('login');

}

const failLogin = (req, res)=>{

    res.render('errors/failLogin', {errorMsg: 'Error, credenciales incorrectas.'});

}


const postLogin = async (req, res)=>{

    res.redirect('/dashboard');    //Credenciales erroneas, lo maneja middleware (checkAuthentication), si estamos bien, a dashboard.

}

const getLogOut = (req, res) =>{

    req.logout((err)=>{
        
        if(err) console.log(err);
        res.redirect('/login');
        
    });

}

module.exports = {
    getSignup,
    postSignup,
    postLogin,
    failSignup,
    failLogin,
    getLogOut,
    getLogin
}