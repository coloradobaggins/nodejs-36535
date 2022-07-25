const path = require('path');
const { Router } = require('express');
const { sessionChecker } = require('../middlewares/session_checker');
const { getSignup, postSignup, postLogin, failSignup } = require('../controllers/login.controller');
const passport = require('passport');

const router = Router();


router.get('/', sessionChecker, (req, res)=>{

    res.redirect('/login');

});

router.get('/login', sessionChecker, (req, res)=>{

    //res.sendFile(path.join(__dirname, '../public', 'login.html'));
    
    res.render('login');

});

//*** router.post('/login', postLogin);
router.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}), postLogin);

router.get('/failLogin', (req, res)=>{
    res.send({message: 'FAILED LOGIN!'});
});

router.get('/signup', sessionChecker, getSignup);

//*** router.post('/signup', postSignup);
router.post('/signup', passport.authenticate('signup', {failureRedirect: '/failSignup'}), postSignup);

router.get('/failSignup', failSignup);

/* ***
router.get('/logout', (req, res)=>{
    
    res.render('logout', {userLoggedIn: req.session.user.username});

    if(req.session){

        req.session.destroy();

    }
        
});
*/

router.get('/logout', (req, res)=>{

    req.logout((err)=>{
        if(err) console.log(err);
        else res.send({message: 'logged out'});
    });

});



router.get('/currentSession', (req, res)=>{

    //res.send(req.session);
    res.send(req.user);

});

module.exports = router;