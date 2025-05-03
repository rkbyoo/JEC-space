//import important starters
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan=require('morgan');
//import database connection functions

const { connectDb } = require("./config/connectDb");
const { connectCloudinary } = require("./config/cloudinary");

//import necessary routes
//const botRoutes = require('./routes/botRoutes.js');
const chatbot = require('./routes/chatbot.js')
//import botRoutes from './routes/botRoutes.js'
const userRoute = require("./routes/userRoute");
const productRoute=require("./routes/productRoute")
// const offerRoute=require("./routes/offerRoute")
const notificationRoute=require("./routes/notificationRoute")
const profileRoute=require("./routes/profileRoute")
const bidRoute = require("./routes/bidRoute")

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// middlewares


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // Logging

//routes middleware (mounting)
app.use("/api/users", userRoute);
app.use("/api/products",productRoute)
app.use("/api/notification",notificationRoute)
app.use("/api/profile",profileRoute)
app.use("/api/bids",bidRoute)
app.use('/api/bot', chatbot); // Bot API

//idk

//database connection
connectDb();
// connectCloudinary();

app.listen(PORT, () => {
  console.log(`The server is running at Port ${PORT}`);
});
app.get("/", async (req, res) => {
  res.send("this is home page");
});
