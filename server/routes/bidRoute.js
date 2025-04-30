const router=require("express").Router();
const Bid=require("../models/bidModel");
const {authZ} = require('../middlewares/authZ');
const {placeBid, getAllBids} = require('../controllers/bid')

//place a new bid
router.post("/place-new-bid",authZ,placeBid)

//get all bids
router.post("/get-all-bids",authZ,getAllBids)

module.exports=router;