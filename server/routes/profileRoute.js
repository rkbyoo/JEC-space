//import controllers and router here
const express = require("express");
const fileupload=require("express-fileupload")
const router = express.Router();

const {updateName,updateProfilePicture}=require("../controllers/profile")
const {authZ}=require("../middlewares/authZ")

//middleware

router.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

router.put("/updateProfilePicture",authZ,updateProfilePicture)
router.put("/updateName",authZ,updateName)

module.exports=router




//logic of the above routes are simple 


//it gets the userId from the middleware and then on next function it parse the value it needs to update on the database for that particular user