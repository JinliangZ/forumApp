const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');


const userShema = new Schema({
    username:{
        type: String,
        required: [true, 'please put in your username'],
        lowercase:true,
        unique: true
    },
    password:{
        type: String,
        required: [true, 'please put in your password'],
        minlength: [6, 'minimum password length is 6 charaters']
    }
}, {timestamps: true});

userShema.pre('save', async function (next){
    //hash the password
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userShema);
module.exports = User;