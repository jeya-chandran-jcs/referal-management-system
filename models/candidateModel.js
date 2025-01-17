const mongoose=require("mongoose")

const candidateSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    image:{type:String},
    phone:{type:Number,required:true},
    jobTitle:{type:String,required:true},
    status:{type:String,required:true,default:"Pending"},
    resumeUrl:{type:String},
    referredAt:{type:Date,default:Date.now}
})

const candidateModel=mongoose.model("Candidate",candidateSchema)

module.exports=candidateModel