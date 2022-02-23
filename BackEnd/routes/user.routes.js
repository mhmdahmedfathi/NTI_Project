const router = require('express').Router()
const userController = require("../controller/user.controller")
const auth = require('../middleware/auth')
const adminAuth = require('../MiddleWare/adminAuth')


router.get("/all", auth , userController.getAll)
router.get("/me", auth , userController.me)


router.post("/register", userController.register)
router.post("/admin",adminAuth,userController.registerAdmin)
router.post("/login", userController.login)
router.post("/logout", auth,userController.logout)
router.post("/logoutAll", auth,userController.logoutAll)
router.post("/AddUserProduct", auth,userController.AddUserProduct)


router.delete("/all",auth, userController.delAll)
router.delete("/all/:id",auth, userController.delSingle)

module.exports= router