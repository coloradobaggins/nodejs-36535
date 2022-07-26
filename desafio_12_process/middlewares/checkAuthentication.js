
const checkAuthentication = (req, res, next)=>{

    console.log('Checking authentication');

    if(req.isAuthenticated()){

        next();
        
    }else{
        res.redirect('/login');
    }

}

module.exports = { checkAuthentication }