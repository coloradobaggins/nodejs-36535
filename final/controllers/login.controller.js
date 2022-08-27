const User = require('../models/User');

const getLogin = (req, res)=>{

    res.render('login');

}

const failLogin = (req, res)=>{

    res.render('failLogin', {errorMsg: 'Error, credenciales incorrectas.'});

}


const postLogin = async (req, res)=>{

    console.log(`user:`);
    console.log(req.user);

    if(req.user.rol==='ADMIN_ROL'){
        res.redirect('/dashboard');    //Credenciales erroneas, lo maneja middleware (checkAuthentication), si estamos bien, a dashboard.
        return;
    }
    res.redirect('/shop');

}



module.exports = {
    postLogin,
    failLogin,
    getLogin
}