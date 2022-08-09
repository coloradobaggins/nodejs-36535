const getProfile = (req, res)=>{

    //console.log(req.user);

    const { name, email, age, address, phone } = req.user;

    

    const userProfileData = {
        name, email, age, address, phone
    }


    res.render('profile',{ 
        userProfileData,
        userLoggedIn: req.user.name,
        userEmailLoggedIn: req.user.email 
    });

}

module.exports = {
    getProfile
}