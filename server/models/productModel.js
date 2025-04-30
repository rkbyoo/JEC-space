const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
    ,
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    billAvailable: {
        type: Boolean,
        default: false,
        required: true
    },
    accessoriesAvailable: {
        type: Boolean,
        default: false
    },
    warrantyAvailable: {
        type: Boolean,
        default: false,
        required: true
    },
    boxAvailable: {
        type: Boolean,
        default: false
    },
    showOffersOnProduct: {
        type: Boolean,
        default: true
    },
    images: {
        type: Array,
        default: []
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: "Pending",
        required: true
    }
},
    { timestamps:true}
)

module.exports = mongoose.model("Product", productSchema)