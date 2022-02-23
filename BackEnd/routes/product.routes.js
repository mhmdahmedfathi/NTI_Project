const router = require('express').Router()
const productsController = require("../controller/product.controller")
const adminAuth = require('../MiddleWare/adminAuth')
const upload = require('../MiddleWare/fileUpload')

router.get("", productsController.allProducts)

router.get('/UserProducts',adminAuth, productsController.UserProducts)

router.post('/addProduct',adminAuth,upload.single('img'), productsController.addProduct)

router.post('/single/:id', productsController.showSingle)

router.put('/edit/:id',adminAuth, productsController.editProduct)

router.delete('/del/:id',adminAuth, productsController.delProduct)

module.exports = router
