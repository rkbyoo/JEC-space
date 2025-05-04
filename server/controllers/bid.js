//import the model

const Bid = require("../models/bidModel");

//place a bid

const placeBid = async (req, res) => {
  try {
    // Get the data from body
    const { mobile, ...rest } = req.body;
    // Convert mobile to string for WhatsApp URL
    const whatsappUrl = `https://wa.me/${mobile.toString()}`;
    // Create new bid with whatsapp field
    const newBid = new Bid({
      ...rest,
      mobile,
      whatsapp: whatsappUrl,
    });

    // Save the data in Bid database
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
};

//get all bids

const getAllBids = async (req, res) => {
  try {
    const { product, seller, buyer } = req.body;
    let filters = {};
    if (product) {
      filters.product = product;
    }
    if (seller) {
      filters.seller = seller;
    }
    if (buyer) {
      filters.buyer = buyer;
    }
    console.log("Filters Applied:", filters);
    const bids = await Bid.find(filters)
      .populate("product")
      .populate("seller")
      .populate("buyer");
    res.send({ success: true, data: bids });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

module.exports = { placeBid, getAllBids };
