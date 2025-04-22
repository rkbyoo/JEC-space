//setup router and middleware

const router = require('express').Router();
const {authZ} = require('../middlewares/authZ');

//import controllers 

const {addNotification,getNotification,deleteNotification,readNotification}=require('../controllers/notification');

//add a notification with route /notify 

router.post("/notify",authZ,addNotification);

//get all notification with route /get-all-notification

router.get("/get-all-notification",authZ,getNotification);

//delete-notification/:id (deleting the notificaiton on basis of param id)

router.delete("/delete-notification/:id",authZ,deleteNotification);

//read all notificaiton with route read-all-notification

router.put("/read-all-notifications",authZ,readNotification);

module.exports=router;