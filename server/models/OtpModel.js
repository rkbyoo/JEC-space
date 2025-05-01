const mongoose=require("mongoose")
const mailSender = require("../utils/mailSender")
const otpTemplate=require("../mail/template/otpVerificationMail")
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,   
         //note it is not date.now() cz it will save the date or time of server startup so it will work for 1st 5 mins but after that it is not gonna work due to expiry time issue which is already passed 
        expires:5*60,
        
    }
})

//creating a function to send mails
async function sendVerificationEmail(email,otp) {
    try {
        const mailResponse=await mailSender(email,"verification email",otpTemplate(otp))
        console.log("verification email sent successfully")
        console.log("this is my mail response",mailResponse)
    } catch (error) {
        console.log("some error occured while sending verification mail",error)
    }
}


//using pre middleware
//this is reff to current object data that is OTPschema 
otpSchema.pre("save",async function (next) {
    await sendVerificationEmail(this.email,this.otp)
    next()
}) 

module.exports=mongoose.model("OTP",otpSchema)