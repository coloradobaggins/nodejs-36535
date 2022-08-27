class UserDTO{
    constructor(user){

        this.name = user.name;
        this.email = user.email;
        this.age = user.age;
        this.address = user.address;
        this.phone = user.phone;

    }
}

module.exports = UserDTO;