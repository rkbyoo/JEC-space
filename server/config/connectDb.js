const mongoose=require("mongoose")
require("dotenv").config()
exports.module=()=>{ 
    mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("database connected successfully")
})
.catch((e)=>{
    console.log("some error while connecting to the database",e)
    process.exit(1)
})
}
