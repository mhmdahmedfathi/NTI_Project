const router = require('express').Router()
const productsController = require("../controller/product.controller")
const adminAuth = require('../MiddleWare/adminAuth')
const upload = require('../MiddleWare/fileUpload')

router.get("", productsController.allProducts)

router.get('/UserProducts',adminAuth, productsController.UserProducts)

router.post('/addProduct',adminAuth, productsController.addProduct)

router.post('/ImagePath',adminAuth,upload.single('img'),(req,res)=>{
    res.status(201).send({
        apiStatus: true,
        data: req.file.path,
        message: "Image added successfully",
      })
})

router.post('/single/:id', productsController.showSingle)

router.put('/edit/:id',adminAuth, productsController.editProduct)

router.delete('/del/:id',adminAuth, productsController.delProduct)

module.exports = router
