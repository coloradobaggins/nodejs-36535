const { Router } = require('express');
const {notFound} = require('../controllers/notfound.controller');


const router = Router();

router.get('/', notFound)



module.exports = router;