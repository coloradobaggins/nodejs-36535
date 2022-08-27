const sessionChecker = (req, res, next)=>{

    console.log(`sessionCheccker, session: ${req.session.user}`);

    if(req.session.user){   //Si tenemos session, vamos a dashboard
    
        res.redirect('/dashboard');
        
    }else{

        next();

    }

}

const productsSessionChecker = (req, res, next)=>{

    if(req.session.user){
        next();
    }else{
        res.redirect('/login')
    }

}

module.exports = {sessionChecker, productsSessionChecker};