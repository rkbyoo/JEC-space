//import important starters
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const fileupload=require("express-fileupload")
//import database connection functions

const { connectDb } = require("./config/connectDb");
const { connectCloudinary } = require("./config/cloudinary");

//import necessary routes
const userRoute = require("./routes/userRoute");
// const productRoute=require("./routes/productRoute")
// const offerRoute=require("./routes/offerRoute")
const notificationRoute=require("./routes/notificationRoute")

require("dotenv").config();
const PORT = process.env.PORT || 5000;

//middlewares
// app.use(fileupload({
//     useTempFiles:true,
//     tempFileDir:"/tmp"
// }))

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
//routes middleware (mounting)
app.use("/api/users", userRoute);
// app.use("/api/product",productRoute)
// app.use("/api/offer",offerRoute)
app.use("/api/notification",notificationRoute)

//idk

//database connection
connectDb();
connectCloudinary();

app.listen(PORT, () => {
  console.log(`The server is running at Port ${PORT}`);
});
app.get("/", async (req, res) => {
  res.send("this is home page");
});
