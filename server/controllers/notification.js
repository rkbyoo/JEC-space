//import the model

const Notification = require("../models/notificationModel");

//add a notification

const addNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.send({
      success: true,
      message: "Notification added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//get all notification by user

const getNotification=async (req,res)=>{
    try{
        const userNotifications = await Notification.find({
            user : req.body.userId
        }).sort({createdAt:-1});
        res.send({
            success:true,
            data:userNotifications
        });
    }
    catch(error)
    {
        res.send({
            success:false,
            message:error.message
        });
    }
    
};

//delete a notification

const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Notification Deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//delete all notifications

const deleteAllNotification = async (req, res) => {
  try {
    await Notification.deleteMany({user : req.body.userId});
    res.send({
      success: true,
      message: "Notification Deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//read all notification by user

const readNotification = async (req, res) => {
  try {

    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).send({ success: false, message: "User ID required" });
    }
    await Notification.updateMany(
      { user: req.body.userId, read: false },
      { $set: { read: true } }
    );
    const updatedNotifications = await Notification.find().sort({ createdAt: -1 });

    res.send({
      success: true,
      message: "All notifications marked as read",
      data:updatedNotifications
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//export

module.exports = {
  addNotification,
  getNotification,
  deleteNotification,
  readNotification,
  deleteAllNotification
};
