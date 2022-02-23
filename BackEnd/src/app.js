require("../database/connection/dbCon")
const express = require("express")
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const productRoutes = require("../routes/product.routes")
app.use("/api/product",productRoutes)

const userRoutes = require("../routes/user.routes")
app.use("/api/user",userRoutes)

app.get('*', (req,res)=> res.send('page not found'))
app.post('*', (req,res)=> res.send('page not found'))

module.exports = app