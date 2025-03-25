
const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },

    products : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
            required : true,
        },
        quantity : {
            type : Number,
            required : true,
        }
    }],

    status : {
        type : String,
        enum : ["pending" , "shipped" , "delivered"],
        default : "pending",
    },
} , {timestamps : true});

module.exports = mongoose.model("Order" , orderSchema);