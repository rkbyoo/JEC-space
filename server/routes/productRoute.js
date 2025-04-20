
const express=require("express")
const router=express.Router()
//import controllers 
const {addProduct,getAllProduct}=require("../controllers/product")
const {authZ}=require("../middlewares/authZ")

//add new product with route /add-product 
router.post("/add-product",authZ,addProduct)
//get all product with route /get-products (category and age based)
router.get("/get-all-product",authZ,getAllProduct)

//get a product by id with route /get-product/:id

//edit a product by id with route /edit-product/:id


//delete a product by id with route /delete-product/:id

//upload the product image with route /upload-image


//update the product status by id with route /update-product-status/:id


module.exports=router