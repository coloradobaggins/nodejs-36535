const { Router } = require('express');
const { getShop, getShopByCategory } = require('../controllers/shop.controller');

const router = Router();


router.get('/', getShop);

router.get('/category/:product?', getShopByCategory);


module.exports = router;