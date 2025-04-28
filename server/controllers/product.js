//import the models
const User = require("../models/userModel");
const Product = require("../models/productModel");
const fs=require("fs");
const path=require("path");

//import the util function of cloudinary

const { imageUploader } = require("../utils/imageUploader");
const cloudinary = require("../config/cloudinary");

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

//get Product details for single user
exports.getUserProduct = async (req,res) => {
  console.log("id is : ", req.params.id);
  try {
    const products = await Product.find({"seller":req.params.id}).populate("seller").sort({createdAt:-1});
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "no products available",
      });
    }
    res.status(200).json({
      success:true,
      message:"User products fetched successfully",
      data:products
    })
    console.log(products);
  } catch (error) {
    console.error("some error while getting product", error);
    return res.status(500).json({
      success: false,
      message: "internal server error in getting the products",
    });
  }
}

//get a single product by id
exports.getSingleProduct = async (req,res) => {
  console.log("id is : ", req.params.id);
  try {
    const product = await Product.findById(req.params.id).populate("seller");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    res.status(200).json({
      success:true,
      message:"Product found",
      data:product
    })
    console.log(product);
  } catch (error) {
    console.error("some error while getting product", error);
    return res.status(500).json({
      success: false,
      message: "internal server error in getting the products",
    });
  }
}

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

//Upload images to cloudinary
exports.uploadImage = async (req, res) => {
  try {
    const files = req.files; // array of files
    console.log(files);
    const productId = req.body.productId;
    const imageUrls = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "JEC-Space",
      });
      imageUrls.push(result.secure_url);
      
      // delete the file from local storage after upload
      fs.unlinkSync(file.path);
    }
    console.log(`imageurls : ${imageUrls}`);
    
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { images: { $each: imageUrls } } },
      { new: true } // this returns the updated document
    );
    
    res.send({
      success: true,
      message: "Images uploaded successfully",
      updatedProduct, // now this will include the updated image URLs
    });
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//update image in selected product
exports.updateImage = async (req, res) => {
  const {images} = req.body;
  try {
    await Product.findByIdAndUpdate(req.params.id, { images });
    return res.status(200).json({
      success: true,
      message: "The image deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};




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
