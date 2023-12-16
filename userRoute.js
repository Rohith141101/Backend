const express=require('express')
const { loginRouter, registerRouter,getRouter,deleteRouter,updateRouter, getRouters } = require('./userController')
const router=express.Router()

router.post('/login',loginRouter)
router.get('/',getRouter)
router.get('/:id',getRouters)
router.put('/:id',updateRouter)
router.delete('/:id',deleteRouter)
router.post('/',registerRouter)

module.exports=router
