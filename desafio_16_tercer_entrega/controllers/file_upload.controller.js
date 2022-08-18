const UserService = require('../services/user.service');

const userService = new UserService();

let postFileUpload = async (req, res, next)=>{

    console.log(`Subiendo foto..`);


    const file = req.file;

    if(!file){
        const error = new Error('Por favor suba una foto');
        error.httpStatusCode = 400;
        return next(error)
    }

    console.log(`Guardar img en db`);

    const imgName = req.file.filename

    console.log(`filename: ${imgName}`);


    let updateImgProfileResult = await userService.updateProfileImg(req.user._id, imgName);

    res.json({
        message: `Successfully uploaded files`,
        updateImg: updateImgProfileResult
    });

}

module.exports = {postFileUpload};