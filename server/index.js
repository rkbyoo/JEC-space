const express=require("express")
const app=express()



const {connectDb}=require("./config/connectDb")
const {connectCloudinary}=require("./config/cloudinary")



const cookieParser = require("cookie-parser")
// const cors=require("cors")
// const fileupload=require("express-fileupload")

require("dotenv").config()
const PORT=process.env.PORT || 4000

//middlewares
// app.use(fileupload({
//     useTempFiles:true,
//     tempFileDir:"/tmp"
// }))
app.use(express.json())
app.use(cookieParser())

// app.use(cors({
//     origin:"http://localhost:3000",
//     credentials:true
// }))


//database connection
connectDb()
connectCloudinary()

app.listen(PORT,()=>{
    console.log(`The server is running at Port ${PORT}`)
})
app.get("/",async(req,res)=>{
    res.send("this is home page")
})
