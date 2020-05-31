const mongoose=require('mongoose');
var signupSchema=new mongoose.Schema({
    email:{
        type:String,
        require: true,
        unique: true
    },
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require:true
    },
    resetPasswordToken:{
        type : String
    },
    resetPasswordExpires:{
        type:Date
    }

});
module.exports=mongoose.model("signup",signupSchema);