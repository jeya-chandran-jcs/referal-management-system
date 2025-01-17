const express=require("express")
const candidateModel=require("../models/candidateModel")
const metricModel=require("../models/metricModel")
const authMiddleware=require("../middleware/authMiddleware")

const router=express.Router()

const updateMetrics = async () => {
    try {
        const totalCandidates = await candidateModel.countDocuments()
        const totalHired = await candidateModel.countDocuments({ status: "Hired" })
        const totalReviewed = await candidateModel.countDocuments({ status: "Reviewed" })
        const totalPending = await candidateModel.countDocuments({ status: "Pending" })

        await metricModel.findOneAndUpdate(
            {},
            { totalCandidates, totalHired, totalReviewed, totalPending },
            { upsert: true }
        )
    } catch (err) {
        console.error("Error updating metrics:", err.message)
    }
}
updateMetrics()
router.get("/dashboard",authMiddleware,async(req,res)=>{
    try{
        const metrics= await metricModel.find()
        res.status(200).json({message:"metrics fetched successfully",metrics})
    }
    catch(err){
        res.status(500).json({message:"failed to retrieve the metrics",err})
    }
})
router.put("/reset",authMiddleware,async(req,res)=>{
    try{
        const result= await candidateModel.updateMany({}, {$set: {status: "Pending"}})
        await res.status(200).json({message:"candidates status reset successfully",result})
    }
    catch(err){
        res.status(500).json({message:"failed to update the candidate status",err})
    }
})

module.exports=router