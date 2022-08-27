const UserService = require('../services/user.service');

const userService = new UserService();

let fileUpload = async (req, res, next)=>{

    const file = req.file;

    if(!file){
        const error = new Error('Por favor suba una foto');
        error.httpStatusCode = 400;
        return next(error)
    }

    const imgName = req.file.filename;
    const imgNameArr = imgName.split('.');
    const extension = imgNameArr[1];

    const validExtensions = ['jpg', 'jpeg', 'gif', 'png', 'webp'];

    if(!validExtensions.includes(extension)){
        return res.status(400).json({
            msg: `Extension invalida, ${validExtensions}`
        });
    }

    
    let updateImgProfileResult = await userService.updateProfileImg(req.user._id, imgName);

    let updated = (updateImgProfileResult!==null) ? true : false;
    
    res.json({
        message: `Img uploaded`,
        updated: updated
    });

}

module.exports = { fileUpload };