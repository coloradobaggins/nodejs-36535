const checkUserRol = (req, res, next)=> {

    const userRol = req.user.rol;
    
    console.log(`UserRol: ${userRol}`);

    next();
}

const checkAdminRol = (req, res, next) => {

    const userRol = req.user.rol;

    if(userRol === "ADMIN_ROL"){
        next();
    }else{
        console.log(`No cumplis con el rol necesario para acceder...`)
        res.redirect('/dashboard');
    }
        

    
}

module.exports = { checkUserRol, checkAdminRol }