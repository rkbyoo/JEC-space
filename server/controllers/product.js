//import the models 
const User=require("../models/userModel")
const Product=require("../models/productModel")

//import the util function of cloudinary 

const {imageUploader}=require("../utils/imageUploader")

//add a new product
exports.addProduct=async(req,res)=>{
    try {
        //get the data from body
        const newProduct=new Product(req.body)
        //save the data in Product database
        await newProduct.save()
         //send notification to admin for approval of this new product ,it can be included in notification contoller as well but for now let it be here
         return res.status(200).json({
            success:false,
            message:"The product is successfully added"
         })
    
    //
        
    } catch (error) {
        console.log("internal error in adding product",error)
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
    
}
  


//get all product details 
    
    //filter by category


    //filter by age of the product 


//get a product by id 


//edit a product 


//delete a product 


//get image from pc 
  

//uplaod image to cloudinary
    
     //using util module for uploading the image to cloudinary and make sure to update the database by updating the image array inside product model/schema 


//update product status 
    
    //send notification to seller 