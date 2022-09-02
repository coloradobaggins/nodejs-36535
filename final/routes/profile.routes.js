const {Router} = require('express');
const {checkAuthentication} = require('../middlewares/checkAuthentication');
const {getProfile, postProfile } = require('../controllers/profile.controller');

const router = Router();

router.get('/', checkAuthentication, getProfile)

router.post('/', checkAuthentication, postProfile)

module.exports = router;