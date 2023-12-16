const express=require('express')
const { loginRouter, registerRouter } = require('./userController')
const router=express.Router()

router.post('/login',loginRouter)
router.post('/',registerRouter)
module.exports=router