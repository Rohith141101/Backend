const bcrypt=require('bcrypt')
const User = require('./userModel')
const expressAsyncHandler = require('express-async-handler')
const registerRouter=expressAsyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    if(!name||!email||!password){
        res.status(400)
        throw new Error("please include all fields")
    }
    const userExist= await User.findOne({email})
    if(userExist){
        res.status(400)
    throw new Error ("User already exist")    
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const user=await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201)
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }
    else{
        res.status(400)
        throw new Error ('Invalid user')
    }
    
})
const loginRouter=expressAsyncHandler(async(req,res)=>{
    res.send("login Route")
})
module.exports={registerRouter,loginRouter}