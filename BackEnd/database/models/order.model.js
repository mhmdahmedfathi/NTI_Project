const mongoose = require("mongoose")
const order = mongoose.model("Order", {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    Products:[
        {
            title:String,
            quantity:Number
        }
    ],
    totalPrice:{
        type:Number
    }
})
module.exports = order
