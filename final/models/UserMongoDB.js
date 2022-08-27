const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB');
const User = require('./User');

class UserMongoDB extends ContenedorMongoDB{

    constructor(){
        super(User);
    }

    async findById(id){
        return await User.findOne({_id: id});
    }

    async updateProfileImg(userId, imgName){


        return await this.update(userId, {photo: imgName});

    }

}

module.exports = UserMongoDB;