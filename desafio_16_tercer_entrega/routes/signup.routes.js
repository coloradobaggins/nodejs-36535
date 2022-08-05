const { Router } = require('express');
const { checkAuthentication } = require('../middlewares/checkAuthentication');
const { getSignup, postSignup, failSignup } = require('../controllers/signup.controller');
const passport = require('passport');

const router = Router();

router.get('/', getSignup);

router.post('/', passport.authenticate('signup', {failureRedirect: '/signup/failSignup'}), postSignup);  //El usuario se crea ahora desde passport
/*router.post('/' , (req,res)=>{
    console.log(`hey hey hey!!`);
});*/  //El usuario se crea ahora desde passport

router.get('/failSignup', failSignup);

module.exports = router;