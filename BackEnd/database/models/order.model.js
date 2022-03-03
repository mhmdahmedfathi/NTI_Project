const mongoose = require("mongoose")
const order = mongoose.model("Order", {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    },
    title:{
        type:String,
        required:true
    }
})
module.exports = order
