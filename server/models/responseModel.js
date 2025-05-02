const mongoose=require("mongoose")
const mailSender = require("../utils/mailSender")
const responseRecordedTemplate=require("../mail/template/responseMail")

const responseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:false,
        default:"no subject"
    },
    message:{
        type:String,
        required:true
    }
})

//send Response mail 
const sendResponseMail=async(email,name)=>{
try {
    const response=await mailSender(email,"Response Submitted",responseRecordedTemplate(name))
    console.log("mail is sent for response")
} catch (error) {
    console.log("some error occured in sending the mail resoponse to the user",error) 
}
}


//using pre middleware to send mesage to the user to have patience till we react out
responseSchema.pre("save",async function(next){
    await sendResponseMail(this.email,this.name)
    next()
} )




module.exports=mongoose.model("Contact",responseSchema)