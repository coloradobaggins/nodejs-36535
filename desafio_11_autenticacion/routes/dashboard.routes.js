const path = require('path');
const { Router } = require('express');

const router = Router();

router.get('/', (req, res)=>{
    //if(req.session.user && req.cookies.user_sid){
    if(req.session.user){
        console.log(`Bien, tenemos sesion de user y cookie user_sid. Enviar a dashboard`);

        //console.log(req.session.user);

        res.render('dashboard', {userLoggedIn: req.session.user.username});
        
    }else{

        console.log(`No tenemos los datos de session ni de cookies, asique va al login!`);

        res.redirect('/login');
    }
})


module.exports = router;