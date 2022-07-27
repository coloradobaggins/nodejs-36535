const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password requerida']
    },
    date: {
        type: Date,
        default: new Date()
    },
    active: {
        type: Boolean,
        default: true
    }

});

//Encrypt before save
UserSchema.pre('save', function(next){

    if(!this.isModified('password')){
        return next();
    }

    let salt = bcrypt.genSaltSync(); //Default 10
    this.password = bcrypt.hashSync(this.password, salt);

    next();

});

//Helpful functions: compare passwords
UserSchema.methods.comparePassword = (pass, hash)=>{

    return bcrypt.compareSync(pass, hash);

}


module.exports = model('User', UserSchema);