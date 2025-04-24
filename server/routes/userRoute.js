//import controllers and router here
const express = require("express");
const router = express.Router();

const {
  login,
  signUp,
  getCurrentUser,
  getAllUser,
  updateUserStatus,
} = require("../controllers/authN");
const { authZ } = require("../middlewares/authZ");

//signup the user with route /signup
router.post("/signup", signUp);
//login using route /login
router.post("/login", login);
//get current user by route /get-current-user
router.get("/get-current-user", authZ, getCurrentUser);
//get all user by route /get-users
router.get("/get-user", authZ, getAllUser);
//update user status by id using route /update-user-status/:id

// update user status
router.put("/update-user-status/:id", authZ, updateUserStatus);

module.exports = router;
