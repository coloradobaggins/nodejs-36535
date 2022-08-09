const { getSystemInfo } = require('../services/info.services');

const getInfo = (req, res)=>{

    let dataObj = getSystemInfo();
    
    res.render('pages/info', {
        userLoggedIn: req.user.username,
        userEmailLoggedIn: req.user.email,
        dataObj
    });

}

module.exports = { getInfo };