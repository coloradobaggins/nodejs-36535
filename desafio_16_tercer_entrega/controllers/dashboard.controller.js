const getDashboard = (req, res)=>{


    console.log(`En dashboard`);


    console.log(req.user);

    console.log(req.session);


    res.render('dashboard', { 
        userLoggedIn: req.user.username,
        userEmailLoggedIn: req.user.email
    });


}

module.exports = { getDashboard };