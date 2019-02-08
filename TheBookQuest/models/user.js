const mongoose = require('mongoose');

//User Schema
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    matriculation:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    resetPasswordToken:String,
    resetPasswordExpires: Date,
    isVerified: { type: Boolean, default: false }
    
});

const User = module.exports = mongoose.model('users', UserSchema);