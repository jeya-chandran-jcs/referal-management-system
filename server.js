const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const seedDatabase=require("./config/dbconfig")
const candidateRoutes=require("./router/candidateRouter")
const metricRoutes=require("./router/MetricRouter")
const userRoutes=require("./router/userRoutes")

dotenv.config()
const app=express()
// app.use(cors())
app.use(cors({
  origin: "http://localhost:5173", 
}));

app.use(express.json())

const port=process.env.PORT || 5000
const mongoUrl=process.env.MONGO_URL

app.use("/candidate",candidateRoutes)
app.use("/metrics",metricRoutes)
app.use("/user",userRoutes)

mongoose.connect(mongoUrl)
.then(async()=>{
    console.log("connected to database")
    
    await seedDatabase()
    .then(() => console.log("Database seeding completed!"))
    .catch((error) => console.error("Error during database seeding:", error));
    app.listen(port,()=>{
        console.log(`server running on port ${port}`)
    })
})
.catch(error=>console.error("error connecting to database",error))