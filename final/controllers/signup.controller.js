
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


    let htmlEmailBody =`<h1 style="color: blue;">Un nuevo <span style="color: green;">USUARIO</span> se registro en el sistema</h1>
    <h2>Sus datos son:</h2>
    <ul>
        <li><b>Usuario:</b> ${registerData.username}</li>
        <li><b>Nombre:</b> ${registerData.name}</li>
        <li><b>Email:</b> ${registerData.email}</li>
        <li><b>Edad:</b> ${registerData.age}</li>
        <li><b>Direccion:</b> ${registerData.address}</li>
        <li><b>Telefono:</b> ${registerData.phone}</li>
    </ul>`;

    sendEmailNotification("NUevo usuario!", htmlEmailBody);

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