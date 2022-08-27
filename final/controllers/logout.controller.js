const getLogOut = (req, res) =>{

    req.logout((err)=>{
        
        if(err) console.log(err);
        res.redirect('/login');
        
    });

}

module.exports = {getLogOut};