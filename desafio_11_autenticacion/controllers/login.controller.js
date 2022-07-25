const User = require('../models/User');

const getSignup = (req, res)=>{

    res.render('signup');
    
}

//Crear nuevo user. Recibo datos para crear modelo.
/*
const postSignup = async (req, res)=>{

    console.log(`Llegamos a post ..`);

    const { username, email, password } = req.body;

    //Check si este user ya existe en la coleccion

    let checkUser = await User.findOne({username: username}).select('username').lean();
    
    if(checkUser) {

        console.log(`redirijo`);

        res.redirect('/failSignup');

    } 
    
    
    const user = new User({
        username,
        email,
        password
    });

    await user.save((err, docs)=>{
        
        if(err){
            console.log(err);
            res.redirect('/signup');
        }else{
            req.session.user = user;
            res.redirect('/dashboard');
        }
        
    });
    

}
*/
const postSignup = (req, res) => {

    res.send({message: 'SE REGISTRO!!, SIGNED UP'});

}

const failSignup = (req, res) =>{



    res.render('failSignup', {errorMsg: 'Usuario ya registrado'})

}

/*
const postLogin = async (req, res)=>{

    const { username, password }= req.body;

    const userDoc = await User.findOne({username: username});
    const comparePass = userDoc.comparePassword(password, userDoc.password);

    //console.log(`compPass: ${comparePass}`);

    if(comparePass){

        req.session.user = userDoc; //Seteo session si pass y user estan ok
        res.redirect('/dashboard'); //Redirigo al dashboard (get '/')

    }else{

        res.redirect('/login');     //Credenciales erroneas, lo dejamos en el login.

    }

}*/

const postLogin = async (req, res)=>{
    res.send({message: `Estamos logueados!`});
}

module.exports = {
    getSignup,
    postSignup,
    postLogin,
    failSignup
}