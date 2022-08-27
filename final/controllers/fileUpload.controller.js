
const UserMongoDB = require('../models/UserMongoDB');
const UserService = require('../services/UserService.service'); 


const imgUpload = async (req, res) =>{

    const userLoggedIn = req.user.id;

    const userMongoDB = new UserMongoDB();
    const userExist = await userMongoDB.findById(userLoggedIn)

    console.log(userExist);

    if(!userExist){
        return res.status(400).json({msg: 'Este usuario no existe en nuestra db.'});
    }

    const oldProfileImg = userExist.photo;

    const userService = new UserService();
    const imgUploaded = await userService.imgUploadService(req.files.archivo);
    if(!imgUploaded){
        return res.status(400).json({msg: 'no se pudo subir archivo'});
    }

    const dbUpdated = await userService.updateProfileImg(userLoggedIn, imgUploaded);

    //Borrar antigua img perfil
    userService.deleteProfileImg(oldProfileImg);


    res.json({
        status:'uploaded',
        imgUploaded
    })
}

//***** */
//TODO:: esta funcion y la de arriba son iguales, solo cambia el post por el put. Ver de refactorizar.
const imgUpdate = async (req, res) =>{

    const { id } = req.params;

    const userMongoDB = new UserMongoDB();
    const userExist = await userMongoDB.findById(id)

    console.log(userExist);

    if(!userExist){
        return res.status(400).json({msg: 'Este usuario no existe en nuestra db.'});
    }

    const oldProfileImg = userExist.photo;

    const userService = new UserService();

    const imgUploaded = await userService.imgUploadService(req.files.archivo);
    
    if(!imgUploaded){
        return res.status(400).json({msg: 'no se pudo subir archivo'});
    }

    const dbUpdated = await userService.updateProfileImg(id, imgUploaded);

    //Borrar antigua img perfil
    userService.deleteProfileImg(oldProfileImg);

    res.json({
        id,
        imgUploaded,
        dbUpdated
    })

}


const getImg = async(req, res)=>{

    const userLoggedIn = req.user._id;

    const userService = new UserService();
    
    const imgPath = await userService.getProfileImg(userLoggedIn);


    res.sendFile(imgPath);

}

module.exports = { imgUpload, imgUpdate, getImg }