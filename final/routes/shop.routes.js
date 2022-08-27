const { Router } = require('express');
const {getShop} = require('../controllers/shop.controller');

const router = Router();


router.get('/', getShop);


module.exports = router;