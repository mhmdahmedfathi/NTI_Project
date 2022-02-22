const router = require('express').Router()
const userController = require("../app/controller/user.controller")
const auth = require('../middleware/auth')
router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/all", auth , userController.getAll)

router.delete("/all",auth, userController.delAll)
router.delete("/all/:id",auth, userController.delSingle)
router.get("/me", auth , userController.me)
router.post("/logout", auth,userController.logout)
router.post("/logoutAll", auth,userController.logoutAll)
module.exports= router