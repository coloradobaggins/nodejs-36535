const { Router } = require('express');
const {getLogOut} = require('../controllers/logout.controller');

const router = Router();

router.get('/', getLogOut);


module.exports = router;