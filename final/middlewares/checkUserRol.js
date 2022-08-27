const checkUserRol = (req, res, next)=> {

    const userRol = req.user.rol;
    
    console.log(`UserRol: ${userRol}`);

    next();
}

module.exports = { checkUserRol }