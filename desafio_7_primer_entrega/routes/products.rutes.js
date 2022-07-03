const { Router } = require('express');
const { productsGet, productsPost, productDelete } = require('../controllers/products.controller');

const router = Router();

router.get('/:id?', productsGet);
router.post('/', productsPost);
//TODO::PUT
router.delete('/:id', productDelete);

module.exports = router;