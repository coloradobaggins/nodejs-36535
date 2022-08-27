const { Router } = require('express');
const {checkAuthentication} = require('../middlewares/checkAuthentication');
const { postLogin, failLogin, getLogOut, getLogin } = require('../controllers/login.controller');

const passport = require('passport');

const router = Router();

/*
router.get('/', checkAuthentication, (req, res)=>{

    res.redirect('/login');

});

router.get('/login', getLogin);
router.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}), postLogin);

*/

router.get('/', getLogin);
router.post('/', passport.authenticate('login', {failureRedirect: '/login/failLogin'}), postLogin);

router.get('/failLogin', failLogin);


//TODO::ME QUEDA COLGADO EL LOGOUT ACA
//Logout
//router.get('/logout', checkAuthentication, getLogOut);




module.exports = router;