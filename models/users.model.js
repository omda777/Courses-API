const mongoose = require('mongoose');
var validator = require('validator');
const userSchema = new mongoose.Schema({
    fullName :{
        type :String ,
        required : [true , "the Name of User must be required."],
        minlength : [2 ,  "at least two charctares"]
    },

    email : {
        type : String ,
        required : [true , "the email of User must be required."],
        unique : true ,
        validate: [validator.isEmail, "Invalid email address."]
    },

    password : {
        type : String ,
        required : [true , "the password of User must be required."],
        minlength : [6 , "at least six charctares"]
    },

})

module.exports = mongoose.model('User' , userSchema);