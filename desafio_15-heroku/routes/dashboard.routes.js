const { Router } = require('express');
const {checkAuthentication} = require('../middlewares/checkAuthentication')

const router = Router();

router.get('/', checkAuthentication, (req, res)=>{
    
    //console.log(req.user);
    res.render('dashboard', { 
        userLoggedIn: req.user.username,
        userEmailLoggedIn: req.user.email
    });

})


module.exports = router;