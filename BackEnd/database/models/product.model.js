const mongoose = require("mongoose")
const product = mongoose.model("Product", {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    title:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:20,
        unique:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        default:""
    }
})
module.exports = product
