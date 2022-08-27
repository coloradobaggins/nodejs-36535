const { Router } = require('express');
const { checkAuthentication, checkFileUpload } = require('../middlewares/');
const { imgUpload, imgUpdate, getImg } = require('../controllers/fileUpload.controller');


const router = Router();

router.get('/', checkAuthentication, getImg);

router.post('/', checkAuthentication, checkFileUpload, imgUpload);

router.put('/:id', checkAuthentication, checkFileUpload, imgUpdate);

module.exports = router;