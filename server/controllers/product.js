//import the models
const User = require("../models/userModel");
const Product = require("../models/productModel");

//import the util function of cloudinary

const { imageUploader } = require("../utils/imageUploader");

//add a new product
exports.addProduct = async (req, res) => {
  try {
    //get the data from body
    const newProduct = new Product(req.body);

    //save the data in Product database
    await newProduct.save();
    //send notification to admin for approval of this new product ,it can be included in notification contoller as well but for now let it be here
    return res.status(200).json({
      success: true,
      message: "The product is successfully added",
      product: newProduct,
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

//get all product details
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller")
      .sort({ createdAt: -1 });
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "no products available",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All the Products are fetched successfully",
      data: products,
    });
    //filter by category

    //filter by age of the product
  } catch (error) {
    console.error("some error while getting product", error);
    return res.status(500).json({
      success: false,
      message: "internal server error in getting the products",
    });
  }
};

//get a product by id

//edit a product
exports.editProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "The product updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "The product deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//get image from pc

//uplaod image to cloudinary

//using util module for uploading the image to cloudinary and make sure to update the database by updating the image array inside product model/schema

//update product status
exports.changeProductStatus = async (req, res) => {
  try {
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);
    const { status } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { status });
    res.send({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    console.error("Error in changeProductStatus:", error);
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//send notification to seller
