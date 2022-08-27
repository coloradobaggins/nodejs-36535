const {Router} = require('express');
const {checkAuthentication} = require('../middlewares/checkAuthentication');
const {getProfile} = require('../controllers/profile.controller');

const router = Router();

router.get('/', checkAuthentication, getProfile)


module.exports = router;