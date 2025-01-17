const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,required:true,default:false},
    resetPasswordToken:{type:String,default:null},
    resetPasswordExpires:{type:Date,default:null},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}

})

const userModel=mongoose.model("User",userSchema);

module.exports=userModel;