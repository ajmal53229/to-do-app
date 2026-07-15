const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    name: String,
    email: {type : String , required: true , unique : true},
    password: {type : String , required : true},
    otp : String,
    isvarified : {
        type : Boolean,
        default : false
    }
})

const user = mongoose.model("user" , userschema)
module.exports = user