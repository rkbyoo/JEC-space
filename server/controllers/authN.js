//import the required models
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// sign up of user
exports.signUp = async (req, res) => {
  try {
    //fetch data
    const { name, email, password, role, timestamps, status, profilePicture } =
      req.body;

    console.log("Incoming signup data:", req.body);

    //data validation
    if (!name || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "please fill up all the details",
      });
    }
    //check if the email already registered or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        status: false,
        message: "user already exists",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //save password
    const userInfo = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      timestamps,
      status,
      profilePicture,
    });

    //send res
    return res.status(200).json({
      success: true,
      message: "User Registerd successfully",
      data: userInfo,
    });
    //we may implement the concept of otp verificaiton here as well
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "internal server error while signup",
    });
  }
};

//user login
exports.login = async (req, res) => {
  try {
    //data validation
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "required information is missing",
      });
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "the user doesn't exist",
      });
    }
    //if user is active or not(posssibility is that admin has blocked the user)

    //compare the passwords

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({
        success: false,
        message: "invalid password",
      });
    }

    //create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    //send res
    return res.status(200).json({
      success: true,
      message: "login successful",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "some internal server error while login",
    });
  }
};

//below are the logic of protected routes

//get current user
exports.getCurrentUser = async (req, res) => {
  try {
    //get the userid
    const userId = req.body.userId;
    //find the user,get all data and return res
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "unable to find the user",
      });
    }
    user.password = "not possible to see password okeeeeee";
    res.status(200).json({
      success: true,
      message: "User Fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("some error occured in fetching user data:", error);
    res.status(500).json({
      success: false,
      message: "internal server error in fetching user data",
    });
  }
};

//get all user (admin ke liye chaiye yeh)
exports.getAllUser = async (req, res) => {
  try {
    console.log("Fetching all users...");
    //find all the user from db
    const users = await User.find();
    console.log("Users:", users);
    //some extra validations
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "no user data found",
      });
    }
    //return all the user in response
    return res.status(200).json({
      success: true,
      message: "all user data fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("some error in fetching all user data", error);
    res.status(500).json({
      success: false,
      message: "internal server error while fetching user data",
    });
  }
};

//update user status (admin can change the user status to inactive ofc)

exports.updateUserStatus = async (req, res) => {
  //get the info of the user
  //check if the user exists or not
  //update the user info in database
  //return response
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
