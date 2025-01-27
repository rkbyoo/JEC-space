const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    additonalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    image:{
        type:String,
        required:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId
        ,ref:"courseProgress"
    }]
})

module.exports=mongoose.model("User",userSchema)