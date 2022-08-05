
const { sendEmailNotification } = require('../utils/emailSender');

const getSignup = (req, res)=>{

    if(req.isAuthenticated()){

        res.redirect('/dashboard');

    }else{
        
        res.render('signup');

    }
    
}




const postSignup = async (req, res) => {  //Antes de llegar aca pasa por el middleware de passport
    
    //Enviar email de notificacion a admin:
    const registerData = req.body;


    sendEmailNotification(registerData);

    res.render('signupSuccess', {msg: 'Registrado correctamente!'});

}

const failSignup = (req, res) =>{

    res.render('failSignup', {errorMsg: 'Usuario ya registrado. Este email ya se encuentra en nuestras bases.'})

}

module.exports = {
    getSignup,
    postSignup,
    failSignup
}