const path = require('path');
const multer = require('multer');
const {Router} = require('express');

const {postFileUpload} = require('../controllers/file_upload.controller');

const router = Router();

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb){
        //cb(null, file.fieldname + '-' + Date.now())
        
        cb(null, Date.now() + path.extname(file.originalname))    //Append file extension
        
    }
})

let upload = multer({storage:storage});



router.post('/', upload.single('files'), postFileUpload);



module.exports = router;