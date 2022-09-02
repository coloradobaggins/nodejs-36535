const fs = require('fs');
const path = require('path');
const UserMongoDB = require('../models/UserMongoDB');
const { uploadFile } = require('../utils/fileUpload');

class UserService{

    constructor(){}

    //Upload file
    imgUploadService = async (theimg)=>{

        //Guardar archivo.
    
        try{
    
            const uploadedFile = await uploadFile(theimg, undefined, 'profile_imgs');
    
            return uploadedFile;
        
    
        }catch(err){
            console.log(err);   //Loggear
            return false;
        }
    
    }

    //Update db
    updateProfileImg = async(userId, imgName) =>{

        const userMongoDB = new UserMongoDB();

        const update = await userMongoDB.updateProfileImg(userId, imgName);

        return update;
    }

    deleteProfileImg = (imgName)=>{

        const imgPath = path.join(__dirname, '../uploads', 'profile_imgs', imgName);

        console.log(`a borrar::: ${imgPath}`);

        if(fs.existsSync(imgPath)){
            fs.unlinkSync(imgPath);
        }

    }

    getProfileImg = async(userId)=>{

        const userMongoDB = new UserMongoDB();

        const user = await userMongoDB.getById(userId);
        
        const profileImg = user.photo;

        if(profileImg === 'default_profile.webp'){
            return path.join(__dirname, '../public', 'imgs', profileImg);
        }

        return path.join(__dirname, '../uploads', 'profile_imgs', profileImg);
    }

    /**
     * Actualiza un usuario
     * @param {*} userId 
     * @param {*} newDataObj 
     * @returns new inserted user obj
     */
    updateProfileData = async(userId, newDataObj) => {

        const userMongoDB = new UserMongoDB();
        const user = await userMongoDB.getById(userId);
        
        //No perder esta data del user
        newDataObj.email = user.email;
        newDataObj.password = user.password;
        newDataObj.photo = user.photo;
        newDataObj.rol = user.rol;
        
        let updated = await userMongoDB.update(userId, newDataObj);
        return updated;
    }

}


module.exports = UserService;