
//import the model

const Bid = require("../models/bidModel");

//place a bid

const placeBid = async(req,res) => {
    try {
        //get the data from body
        const newBid = new Bid(req.body);
    
        //save the data in Bid database
        await newBid.save();
        //send notification to admin for approval of this new product ,it can be included in notification contoller as well but for now let it be here
        return res.status(200).json({
          success: true,
          message: "Bid placed successfully",
          bid: newBid,
        });
    
        //
    } catch (error) {
        console.log("internal error in adding product", error);
        res.status(500).json({
          success: false,
          message: "internal server error",
        });
    }
}

//get all bids

const getAllBids = async (req,res) => {
    try{
        const {product,seller} = req.body;
        let filters = {};
        if(product)
        {
            filters.product=product;
        }
        if(seller)
        {
            filters.seller=seller;
        }

        const bids = await Bid.find(filters)
            .populate("product")
            .populate("seller")
            .populate("buyer")
        res.send({success:true,data:bids});
    }
    catch(error)
    {
        res.send({success:false,message:error.message});
    }
}


module.exports={placeBid, getAllBids};