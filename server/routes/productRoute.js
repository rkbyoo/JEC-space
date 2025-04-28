const multer = require('multer');
const express = require("express");
const router = express.Router();

//import controllers
const {
  addProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
  changeProductStatus,
  uploadImage,
  updateImage,
  getUserProduct,
  getSingleProduct
} = require("../controllers/product");
const { authZ } = require("../middlewares/authZ");

//add new product with route /add-product
router.post("/add-product", authZ, addProduct);

//get all product with route /get-products (category and age based)
router.get("/get-all-product", authZ, getAllProduct);

//get user products by id with route /get-user-product/:id
router.get("/get-user-product/:id",authZ,getUserProduct);

//get a single product by id with route /get-single-product/:id
router.get("/get-single-product/:id",authZ,getSingleProduct);

//edit a product by id with route /edit-product/:id
router.put("/edit-product/:id", authZ, editProduct);

//delete a product by id with route /delete-product/:id
router.delete("/delete-product/:id", authZ, deleteProduct);

//update the product status by id with route /update-product-status/:id
router.put("/update-product-status/:id", authZ, changeProductStatus);


//get image from pc
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/'); // Make sure this folder exists in your project root
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

//upload the product image with route /upload-image
router.post(
  "/upload-image",
  authZ,
  multer({ storage: storage }).array("files", 10), // "files" matches frontend field name
  uploadImage
);

//Update the product image with route /update-image
router.put(
  "/update-image/:id",
  authZ,
  updateImage
)

module.exports = router;
