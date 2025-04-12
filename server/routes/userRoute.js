

//import controllers and router here
const express=require("express")
const router=express.Router()

const {login,signUp}=require("../controllers/authN")


//signup the user with route /signup
router.post("/signup",signUp)
//login using route /login
router.post("/login",login)
//get current user by route /get-current-user


//get all user by route /get-user


//update user status by id using route /update-user-status/:id

module.exports=router;

