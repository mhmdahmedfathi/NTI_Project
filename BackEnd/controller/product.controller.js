const productModel = require("../database/models/product.model")

class productsController{
    
    static allProducts = async(req,res)=>{

        const Products = await productModel.find()
        res.status(200).send({data:Products})
    }
    static addProduct = async (req,res)=>{
        const Product = new productModel({
            userId:req.user._id,
            ...req.body
        })
        await Product.save()
        res.status(201).send({message:"added"})
    }
    static showSingle = async (req,res)=>{
        const Product = await productModel.find({
            title:req.body.title
        })
        res.status(200).send({data:Product})
    }
    static editProduct = async (req,res)=>{
        const Product = await productModel.findOneAndUpdate({
            userId:req.user._id,
            title:req.body.title
        },{...req.body})

        if(Product == null){
            return res.status(401).send({err : "you are not Authroized to make this edition"})
        }
        res.status(200).send({message:"edit complete"})

    }
    static delProduct = (req,res)=>{
        const Product = await productModel.findOneAndRemove({
            userId:req.user._id,
            title:req.body.title
        })

        if(Product == null){
            return res.status(401).send({err:"you are not Authorized to make this change"})
        }
        res.status(200).send({message:"delete complete"})
    }

}



module.exports = productsController