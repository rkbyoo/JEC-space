//import the required models
const User=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
// sign up of user
exports.signUp=async(req,res)=>{

    //fetch data
    const {name,email,password,role,timestamps,status,profilePicture}=req.body
    //data validation 
    if(!name || !email || !password || !role || !timestamps || !status || !profilePicture){
        res.status(404).json({
            success:false,
            message:"please fill up all the details"
        })
    }
        //check if the email already registered or not 
    const user=User.findOne({email})
    if(user){
        res.status(403).json({
            status:false,
            message:"user already exists"
        })
    }

    //hash password 
    const hashedPassword=bcrypt.hash(password,10)
    //save password 
    const userInfo={
        name,email,password:hashedPassword,role,timestamps,status,profilePicture
    }
    userInfo.save()

    //send res
    res.status(200).json({
        success:true,
        message:"User Registerd successfully",
        data:userInfo
    })
    //we may implement the concept of otp verificaiton here as well
}


//user login 
exports.login=async(req,res)=>{
    //data validation
    const{email,password}=req.body
    const user=User.findOne({email})
    if(!email || !password){
        res.status(404).json({
            success:false,
            message:"required information is missing"
        })
    }
    if(!user){
        return res.status(404).json({
            success:false,
            message:"the user doesn't exist"
        })
    }
    //if user is active or not(posssibility is that admin has blocked the user)
    
    //compare the passwords 
    
    if(!bcrypt.compare(user.password,password)){
       return res.status(403).json({
            success:false,
            message:"invalid password"
        })
    }
    
    //create and assign token
    //send res
    return res.status(200).json({
        success:true,
        message:"login successful",
        token:token
    })
}
    

//get current user 


//get all user (admin ke liye chaiye yeh)


//update user status 