const jwt = require("jsonwebtoken");
//decrypt the jwt token here and pass the userId as request for the next fucntion
require("dotenv").config();

exports.authZ = async (req, res, next) => {
  try {
    //parse the token from header
    const authHeader = req.header("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        success: false,
        message: "Authorization header missing or malformed",
      });
    }
    const token = authHeader.split(" ")[1];
    //decrypt the token using verify
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
    //pass the token as request for the next function
    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    console.error("some error occured in authorization", error);
    return res.status(403).json({
      success: false,
      message: "This is a protected route for users,authorization failed",
    });
  }
};
