const User = require('../models/User');

const getSignup = (req, res)=>{

    res.render('signup');
    
}

//Crear nuevo user. Recibo datos para crear modelo.
const postSignup = async (req, res)=>{

    console.log(`Llegamos a post ..`);

    const { username, email, password } = req.body;

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

} 

module.exports = {
    getSignup,
    postSignup,
    postLogin
}