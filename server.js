const express=require('express')
var cors = require('cors')
const userHandler = require('./userHandler')
const connectDB = require('./db')
const dotenv=require('dotenv').config()
const PORT=process.env.PORT
const app=express()
connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(userHandler)
app.use("/api/users",require('./userRoute'))
app.get("/",(req,res)=>res.send('Hello from server.js'))
app.listen(PORT,()=>console.log(`port ${PORT} is rendered`))
