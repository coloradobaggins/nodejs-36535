const getDashboard = (req, res)=>{


    res.render('dashboard', { 
        userLoggedIn: req.user.name,
        userEmailLoggedIn: req.user.email
    });


}

module.exports = { getDashboard };