//import the required models
const User=require("../models/userModel")
const bcrypt=require("bcrypt")
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
    //data validation
    //if user is active or not(posssibility is that admin has blocked the user)
    //compare the passwords 
    //create and assign token 
    //send res

//get current user 


//get all user (admin ke liye chaiye yeh)


//update user status 