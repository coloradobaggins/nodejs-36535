const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB');
const User = require('../../models/User');

class UserDaoMongo extends ContenedorMongoDB{

    constructor(){
        super(User);
    }


    async updateProfileImg(userId, imgName){


        return await this.update(userId, {photo: imgName});

    }

}

module.exports = UserDaoMongo;