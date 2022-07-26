const { Router } = require('express');
const {checkAuthentication} = require('../middlewares/checkAuthentication');
const { getSignup, postSignup, postLogin, failSignup, failLogin, getLogOut, getLogin } = require('../controllers/login.controller');
const passport = require('passport');

const router = Router();


router.get('/', checkAuthentication, (req, res)=>{

    res.redirect('/login');

});

router.get('/login', getLogin);

router.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}), postLogin);

router.get('/signup', getSignup);

router.post('/signup', passport.authenticate('signup', {failureRedirect: '/failSignup'}), postSignup);  //El usuario se crea ahora desde passport

//Fails..
router.get('/failSignup', failSignup);
router.get('/failLogin', failLogin);

//Logout
router.get('/logout', checkAuthentication, getLogOut);

//Check...
router.get('/currentSession', (req, res)=>{

    res.send(req.user);

});

module.exports = router;