const UserService = require('../services/UserService.service');

const getProfile = (req, res)=>{

    //console.log(req.user);

    const { name, email, age, address, phone, photo } = req.user;

    

    const userProfileData = {
        name, email, age, address, phone, photo
    }


    res.render('profile',{ 
        userProfileData,
        userLoggedIn: req.user.name,
        userEmailLoggedIn: req.user.email 
    });

}

//Cambiar datos de perfil de usuario

postProfile = async(req, res)=>{

    const body = req.body;

    const userService = new UserService();
    const update = await userService.updateProfileData(req.user._id, body);

    if(update !== null){
        return res.redirect('/profile');
    }
    res.json({msg: 'cant update profile data..'});
}

module.exports = {
    getProfile,
    postProfile
}