const express=require("express")
const candidateModel=require("../models/candidateModel")
const authMiddleware=require("../middleware/authMiddleware")
const router=express.Router()

router.post('/referal',authMiddleware,async (req, res) => {
    try {
        const { name, email, phone, jobTitle, resumeUrl, image, status } = req.body;

        const newCandidate = new candidateModel({
            name,
            email,
            phone,
            jobTitle,
            resumeUrl,
            image,
            status,
        });
        await newCandidate.save();

        res.status(201).json({
            message: 'Referral added successfully',
            candidate: newCandidate,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add referral',
            error: error.message,
        });
    }
});
  
router.get("/dashboard",async(req,res)=>{
    try{
        const candidates=await candidateModel.find()
        res.status(200).json({message:"candidates fetched successfullt",candidates})
    }
    catch(err){
        res.status(500).json({message:"failed to retrieve the candidate data",err})
    }
})

router.put("/update",authMiddleware, async (req, res) => {
    const { _id, status } = req.body; 

    try {
        console.log(req.body)

        if (!_id || !status) {
            return res.status(400).json({ message: "Candidate ID and status are required" });
        }

        const candidate = await candidateModel.findByIdAndUpdate(
            _id,
            { status },
            { new: true } 
        );
        console.log(candidate)
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        res.status(200).json({ message: "Candidate updated successfully", candidate });
    } catch (err) {
        res.status(500).json({ message: "Failed to update the candidate", error: err.message });
    }
});

router.delete("/delete",authMiddleware, async (req, res) => {
    const { _id } = req.body; 

    try {
        console.log("Request Body:", req.body);         console.log("Candidate ID:", _id); 

        if (!_id) {
            return res.status(400).json({ message: "Candidate ID is required" });
        }

        const candidate = await candidateModel.findByIdAndDelete(_id);
        console.log("Deleted Candidate:", candidate); 

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        res.status(200).json({ message: "Candidate deleted successfully", candidate });
    } catch (err) {
        console.error("Error:", err.message); 
        res.status(500).json({ message: "Failed to delete the candidate", error: err.message });
    }
});

module.exports=router