const multer = require("multer")
const path = require("path")
const fs = require("fs")

let loc = ""
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        if(req.user)
            loc = path.join("images",req.user._id.toString())
        else    
            loc = "images"
        fs.mkdir(loc,(err)=>{})
        cb(null,loc)
    },
    filename:function(req,file,cb){
        const name = `${Date.now()}${path.extname(file.originalname)}`
        cb(null,name)
    }
})

const upload = multer({
    storage,
    limits:{fileSize:20000000}
})


module.exports = upload