const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = Schema({

    name: {
        type: String,
        required: true
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
    age:{
        type: Number
    },
    address:{
        type: String
    },
    phone:{
        type: String
    },
    date: {
        type: Date,
        default: new Date()
    },
    photo:{
        type: String,
        default: 'https://cdn2.iconfinder.com/data/icons/digital-marketing-7/64/39_returning_visitor-128.png'
    },
    rol:{
        type: String,
        required:true,
        emun: ['ADMIN_ROL', 'USER_ROL']
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