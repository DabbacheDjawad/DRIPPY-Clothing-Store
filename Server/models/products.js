
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "please provide a name for the product"]
    },

    category : {
        type : String,
        required : [true , "please provide a category for the product"],
        enum:["shirts" , "jackets" , "pants" , "shoes"],
    },

    price : {
        type : Number,
        required : [true , "please provide a price for the product"],
    },

    description : {
        type : String,
        required : true,
    },

    availableSizes : [{
        type : String,
        required : [true , "please provide some available sizes"],
        enum : ["S" , "M" , "L" , "XL" , "XXL" , "XXXL"]
    }],

    available : {
        type : Boolean,
        required : true
    },

    image : [{
        type : String,
        required : true
    }]
})

module.exports = mongoose.model("Procduct" , productSchema);