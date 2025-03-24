const express=require("express")
const app=express()



const {connectDb}=require("./config/connectDb")
const {connectCloudinary}=require("./config/cloudinary")


const authRoutes=require("./routes/auth")
const itemRoutes=require("./routes/items")
const resourceRoutes=require("./routes/resources")
const chatRoutes=require("./routes/chat")


const cookieParser = require("cookie-parser")
const cors=require("cors")
const fileupload=require("express-fileupload")

require("dotenv").config()
const PORT=process.env.PORT || 4000

//middlewares
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/item",itemRoutes)
app.use("/api/v1/resource",resourceRoutes)
app.use("/api/v1/chat",chatRoutes)


//database connection
connectDb()
connectCloudinary()

app.listen(PORT,()=>{
    console.log(`The server is running at Port ${PORT}`)
})
app.get("/",async(req,res)=>{
    res.send("this is home page")
})
