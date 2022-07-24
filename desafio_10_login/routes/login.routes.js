const path = require('path');
const { Router } = require('express');
const { sessionChecker } = require('../middlewares/session_checker');
const { getSignup, postSignup, postLogin } = require('../controllers/login.controller');

const router = Router();


router.get('/', sessionChecker, (req, res)=>{

    res.redirect('/login');

});

router.get('/login', sessionChecker, (req, res)=>{

    //res.sendFile(path.join(__dirname, '../public', 'login.html'));
    
    res.render('login');

});

router.post('/login', postLogin);

router.get('/signup', sessionChecker, getSignup);

router.post('/signup', postSignup);

router.get('/logout', (req, res)=>{
    
    res.render('logout', {userLoggedIn: req.session.user.username});

    if(req.session){

        req.session.destroy();

    }
        
});


module.exports = router;