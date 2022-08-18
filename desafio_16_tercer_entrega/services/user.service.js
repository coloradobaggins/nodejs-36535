const PersistenceFactory = require('../daos/PersistenceFactory');

class UserService{
    
    constructor(){

        this.userDao;
        this.init();

    }

    init = async()=> {

        this.userDao = await PersistenceFactory.getUserPersistence();

    }

    updateProfileImg = async(userId, imgName)=>{

        return await this.userDao.updateProfileImg(userId, imgName);

    }

}

module.exports = UserService;