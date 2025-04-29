//importing models
const User=require("../models/userModel")
const {uploadToCloudinary}=require("../utils/imageUploader")

exports.updateProfilePicture=async(req,res)=>{
    try {
      //get the user id 
      const userId=req.body.userId
      const {newProfilePhoto}=req.files
      //put the validations
      if(!userId || !newProfilePhoto){
        return res.status(404).json({
          success:false,
          message:"error while fetching details"
        })
      }
      const user=await User.findById(userId)
      if(!user){
        return res.status(404).json({
            success:false,
            message:"No user found"
        })
      } 
      //upload the image to cloudinary 
      const uploadResponse=await uploadToCloudinary(newProfilePhoto,"profilePhotos",100,100)
      //get the secure url and update the user database profile attribute
      const updatedProfilePhoto=User.findByIdAndUpdate({_id:userId},{profilePicture:uploadResponse.secure_url},{new:true})
      //return res with new image
      res.status(200).json({
        success:true,
        message:"Profile Photo updated successfully",
        data:updatedProfilePhoto
      })
    } catch (error) {
      console.error("some error while updating the profile picture",error)
      return res.status(500).json({
        success:false,
        message:"internal server error"
      })
    }
  }
  
  exports.updateName=async(req,res)=>{
    try {
        //get the data of new name
    const {userName,userId}=req.body
    //put some validations
    const user=await User.findById(userId)
    if(!user){
        return res.status(404).json({
            success:false,
            message:"no user found"
        })
    }
    //update the database of user 
    const updatedProfileInfo=await User.findByIdAndUpdate({userId},{name:userName},{new:true})
    //return the res with new name
    return res.status(200).json({
        success:true,
        message:"Name changed successfully",
        data:updatedProfileInfo
    })
    } catch (error) {
        console.error("some error occured while updating name")
        return res.status(500).json({
            success:false,
            message:"internal server error while updating name"
        })
    }
    
  }