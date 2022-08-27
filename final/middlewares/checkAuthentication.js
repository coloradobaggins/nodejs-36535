
const checkAuthentication = (req, res, next)=>{

    console.log('Checking authentication');

    if(req.isAuthenticated()){

        next();
        
    }else{
        console.log(`redirect a login, no esta logueado`);
        res.redirect('/login');
    }

}

module.exports = { checkAuthentication }