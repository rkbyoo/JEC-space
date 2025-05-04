//importing models
const User = require("../models/userModel")
const Product = require("../models/productModel")
const Notification = require("../models/notificationModel")
const Offer = require("../models/offerModel")
const bcrypt = require("bcrypt")
const { uploadToCloudinary } = require("../utils/imageUploader")

exports.updateProfilePicture = async (req, res) => {
  try {
    //get the user id 
    const userId = req.body.userId
    const newProfilePicture = req.files.newProfilePicture
    console.log("the request is having", newProfilePicture, userId)
    //put the validations
    if (!userId || !newProfilePicture) {
      return res.status(404).json({
        success: false,
        message: "error while fetching details"
      })
    }
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found"
      })
    }
    //upload the image to cloudinary 
    const uploadResponse = await uploadToCloudinary(newProfilePicture, "profilePhotos", 100, 100)
    //get the secure url and update the user database profile attribute
    const updatedProfilePhoto = await User.findByIdAndUpdate(userId, { profilePicture: uploadResponse.secure_url }, { new: true })
    //return res with new image
    res.status(200).json({
      success: true,
      message: "Profile Photo updated successfully",
      data: updatedProfilePhoto
    })
  } catch (error) {
    console.error("some error while updating the profile picture", error)
    return res.status(500).json({
      success: false,
      message: "internal server error"
    })
  }
}

exports.updateName = async (req, res) => {
  try {
    //get the data of new name
    const { userName, userId } = req.body
    //put some validations
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "no user found"
      })
    }
    //update the database of user 
    const updatedProfileInfo = await User.findByIdAndUpdate(userId, { name: userName }, { new: true })
    //return the res with new name
    return res.status(200).json({
      success: true,
      message: "Name changed successfully",
      data: updatedProfileInfo
    })
  } catch (error) {
    console.error("some error occured while updating name")
    return res.status(500).json({
      success: false,
      message: "internal server error while updating name"
    })
  }

}

exports.deleteAccount = async (req, res) => {
  try {
    //get the data from req
    const { confirmPassword,userId} = req.body
    //check the userid to be present in different databases and then delete them one by one
    if (!userId || !confirmPassword) {
      return res.status(404).json({
        success: false,
        message: "fetching user or password failed"
      })
    }
    const user = await User.findById(userId)
    if (await bcrypt.compare(confirmPassword,user.password)) {
      await Product.deleteMany({ seller: userId })
      await Notification.deleteMany({ user: userId })
      await Offer.deleteMany({seller:userId})
      //delete the entry from user database
      await User.findByIdAndDelete(userId)
      //return res
      return res.status(200).json({
        success: true,
        message: "The account is deleted successfully"
      })
    }
    else{
      return res.status(403).json({
        success:false,
        message:"The password is incorrect"
      })
    }
  } catch (error) {
    console.error("some error while deleting acc", error)
    return res.status(500).json({
      success: false,
      message: "internal server error in deleting acc"
    })
  }
}




exports.changePassword = async (req, res) => {
  try {
    //get the payload 
    const {currentPassword,newPassword,userId}=req.body
    console.log(req.body)
    //check the user id and its validation
    if(!currentPassword || !newPassword || !userId){
      return res.status(404).json({
        success:false,
        message:"some error while fetching the userId and other details"
      })
    }
    if(currentPassword==newPassword){
      return res.status(403).json({
        success:false,
        message:"choose a new password"
      })
    }
    const user=await User.findById(userId)
    //match the ps
    if(await bcrypt.compare(currentPassword,user.password)){
       //hash and update the ps
      const hashedPassword=await bcrypt.hash(newPassword,10)
      await User.findByIdAndUpdate(userId,{password:hashedPassword})
      //return res
      return res.status(200).json({
        success:true,
        message:"the password is changed successfully"
      })
    }
    else{
      return res.status(403).json({
        success:false,
        message:"Password is incorrect"
      })
    }
   
  } catch (error) {
    console.error("some error while updating password", error)
    return res.status(500).json({
      success: false,
      message: "internal server error in updating password"
    })
  }
}