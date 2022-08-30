const getDashboard = (req, res)=>{

    const userRol = req.user.rol;
    
    console.log(`UserRol: ${userRol}`);

    let rolAdmin = (userRol === "ADMIN_ROL") ? userRol : null;
    console.log(`rol:`)
    console.log(rolAdmin);
    res.render('dashboard', { 
        userLoggedIn: req.user.name,
        userEmailLoggedIn: req.user.email,
        rolAdmin
    });


}

module.exports = { getDashboard };