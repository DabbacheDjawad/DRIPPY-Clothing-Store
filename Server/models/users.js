const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv")
const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required : [true , "please Provide a name"]
    },

    email : {
        type : String,
        required : [true , "Please Provide an Email"],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide a valid email",
        ],
        unique : true
    },

    password : {
        type : String,
        required : [true , "Please Provide a Password"],
        minlength : 6,
    },

    role : {
        type : String,
        default : "client",
        enum:["client" , "admin" , "superAdmin"]
    },

    isBlocked : {
        type : Boolean,
        required : true,
        default : false,
    }
})

//Hashing Password
userSchema.pre("save" , async function(next){
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next();
});

//compare Passwors
userSchema.methods.comparePasswords = async function(enteredPassword){
    const matched = await bcrypt.compare(enteredPassword , this.password);
    return matched;
}

//Signing the JWT
userSchema.methods.createJWT = async function(){
    return jwt.sign({name : this.name , role : this.role , userID : this._id , isBlocked : this.isBlocked}
        ,process.env.JWT_SECRET
        ,{expiresIn:process.env.JWT_LIFETIME})
}


module.exports = mongoose.model("User" , userSchema);