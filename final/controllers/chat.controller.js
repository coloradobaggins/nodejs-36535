const getChat = (req, res)=>{

    res.render('chat', {
        userLoggedIn: req.user.name,
        userEmailLoggedIn: req.user.email 
    });

}

module.exports = { getChat };