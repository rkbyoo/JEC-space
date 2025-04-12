//import the required models
const User=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
// sign up of user
exports.signUp=async(req,res)=>{
    try {
        //fetch data
    const {name,email,password,role,timestamps,status,profilePicture}=req.body

    console.log("Incoming signup data:", req.body);

    //data validation 
    if(!name || !email || !password){
        return res.status(404).json({
            success:false,
            message:"please fill up all the details"
        })
    }
        //check if the email already registered or not 
    const user=await User.findOne({email})
    if(user){
        return res.status(403).json({
            status:false,
            message:"user already exists"
        })
    }

    //hash password 
    const hashedPassword=await bcrypt.hash(password,10)
    //save password 
    const userInfo=await User.create({
        name,email,password:hashedPassword,role,timestamps,status,profilePicture 
    })

    //send res
    return res.status(200).json({
        success:true,
        message:"User Registerd successfully",
        data:userInfo
    })
    //we may implement the concept of otp verificaiton here as well
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"internal server error while signup"
        })
    }

}


//user login 
exports.login=async(req,res)=>{
    try {
        //data validation
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(!email || !password){
        return res.status(404).json({
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
    
    if(!await bcrypt.compare(password,user.password)){
       return res.status(403).json({
            success:false,
            message:"invalid password"
        })
    }
    
    //create and assign token
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
    //send res
    return res.status(200).json({
        success:true,
        message:"login successful",
        token:token
    })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"some internal server error while login"
        })
    }
    
}
    

//get current user 


//get all user (admin ke liye chaiye yeh)


//update user status 