const mongoose=require("mongoose")
const candidateModel=require("../models/candidateModel")
const {sample_candidates}=require("../data")

const seedDatabase=async()=>{
    try{
        const dataCount=await candidateModel.countDocuments();

        if(dataCount===0){
            console.log("no data found, seeding database...")

            await candidateModel.insertMany(sample_candidates)
            console.log("Database seeded total")
        }
        else{
            console.log(`database already seeded with ${dataCount} records`)
        }
    }
    catch(error){
        console.error("Error seeding database",error)
    }
}

module.exports=seedDatabase