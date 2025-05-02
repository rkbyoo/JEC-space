const { response } = require("express")
const Contact = require("../models/responseModel")

//get all response (for admin)
exports.getAllResponses = async (req, res) => {
    try {
        //return all the responses from contact db
        const responses = await Contact.find({})
        if (!responses) {
            return res.status(404).json({
                success: false,
                message: "No responses found"
            })
        }
        console.log("the responses for contact are",responses)
        return res.status(200).json({
            success: true,
            message: "all the responses fetched successfully",
            data: responses
        })
    } catch (error) {
        conosle.log("some error occured while fetching responses", error)
        return res.status(500).json({
            success: false,
            message: "internal server error in get response"
        })
    }
}


//to send the response and save it
exports.saveResponse = async (req, res) => {

    try {
        //get all the details of response
        const {email,name,subject,message}=req.body
        //validation
        if(!name || !email || !message){
            return res.status(404).json({
                success:false,
                message:"required fields missing"
            })
        }
        //save it in db
        const response=await Contact.create({email,name,subject,message})
        return res.status(200).json({
            success:true,
            message:"we got your mail",
            data:response
        })

        //return res
    } catch (error) {
        console.log("some error in saving response",error)
        return res.status(500).json({
            success:false,
            message:"internal server error while saving response"
        })
    }

}