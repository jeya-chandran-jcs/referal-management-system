const mongoose=require("mongoose")

const metricSchema=new mongoose.Schema({
    totalCandidates:{type:Number},
    totalHired:{type:Number,default:0},
    totalPending:{type:Number,default:0},
    totalReviewed:{type:Number,default:0},
})

const metricModel=mongoose.model("Metric",metricSchema)

module.exports=metricModel