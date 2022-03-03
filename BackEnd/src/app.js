require("../database/connection/dbCon")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const productRoutes = require("../routes/product.routes")
app.use("/api/product",productRoutes)

const userRoutes = require("../routes/user.routes")
app.use("/api/user",userRoutes)

app.get('/image/:fol/:sub/:imgName', (req,res)=>{
    const path = require("path")
    res.sendFile(path.join(__dirname ,`../${req.params.fol}/${req.params.sub}/${req.params.imgName}`))
})

app.get('*', (req,res)=> res.send('page not found'))
app.post('*', (req,res)=> res.send('page not found'))

module.exports = app