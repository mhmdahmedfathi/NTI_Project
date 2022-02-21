const router = require('express').Router()
const productsController = require("../controller/product.controller")
const auth = require("../MiddleWare/auth")

router.get("", productsController.allProducts)

router.post('/addPost',auth, productsController.addProduct)

router.get('/single/:id', productsController.showSingle)

router.post('/edit/:id',auth, productsController.editProduct)

router.get('/del/:id',auth, productsController.delProduct)

module.exports = router
