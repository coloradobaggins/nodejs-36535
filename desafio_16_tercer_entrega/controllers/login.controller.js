const User = require('../models/User');

const getLogin = (req, res)=>{

    res.render('login');

}

const failLogin = (req, res)=>{

    res.render('failLogin', {errorMsg: 'Error, credenciales incorrectas.'});

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
    postLogin,
    failLogin,
    getLogOut,
    getLogin
}