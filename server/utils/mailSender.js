const nodemailer=require("nodemailer")
require("dotenv").config()
const mailSender=async(email,title,body)=>{
    try {
        let transporter=nodemailer.createTransport({
            service: "gmail",
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info=await transporter.sendMail({
            from:'JEC-space community'
            ,to:`${email}`
            ,subject:`${title}`
            ,html:`${body}`
        })
        console.log(info)
        return info;
    } catch (error) {
        console.log("some error while sending the mail",error.message)
    }
}
module.exports=mailSender