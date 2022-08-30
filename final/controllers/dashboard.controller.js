const getDashboard = (req, res)=>{

    const userRol = req.user.rol;
    
    console.log(`UserRol: ${userRol}`);

    let rol = (userRol === "ADMIN_ROL") ? userRol : null;
    console.log(`rol:`)
    console.log(rol);
    res.render('dashboard', { 
        userLoggedIn: req.user.name,
        userEmailLoggedIn: req.user.email,
        rol
    });


}

module.exports = { getDashboard };