const mongoose=require("mongoose")
const additionalDetailSchema=mongoose.Schema({
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:false
    },
    phoneNum:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Profile",additionalDetailSchema)

