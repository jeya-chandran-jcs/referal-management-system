const nodemailer=require("nodemailer")
const dotenv=require("dotenv")

dotenv.config()
const Pass=process.env.PASS
const email=process.env.EMAIL

const transporter= nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:email,
        pass:Pass
    }
})

const sendMail= async(to,subject,html)=>{
    try{
        const mailOptions = {
            from: email,
            to,
            subject,
            html
        }
        await transporter.sendMail(mailOptions)
        console.log("email sent successfully")
    }
    catch(err){
        return res.status(400).json({message:"email cant send"})
    }

}

module.exports=sendMail