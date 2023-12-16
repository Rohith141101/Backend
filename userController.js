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
const getRouter=expressAsyncHandler(async(req,res)=>{
    // const {id}=req.params
    const users= await User.find()
    console.log(users)
    if(users){
        res.status(201)
        res.json({
            users
        }
    )
    }
    else{
        res.status(400)
        throw new Error("User not found")
    }
})

const getRouters=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params
    const user= await User.findById(id)
    if(user){
        res.status(200)
        res.json({
            user
        }
    )
    }
    else{
        res.status(400)
        throw new Error("User not found")
    }
})
const updateRouter = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
      const user = await User.findById(id);
  
      if (user) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
  
      res.status(200).json({
        updatedUser,
      })
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }
  })
  

const deleteRouter=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params
    const users= await User.findById(id)
    if(users){
         User.findByIdAndDelete(id)
        res.status(201)
        res.json({
            message:"user deleted successfully"
        }
    )
    }
    else{
        res.status(400)
        throw new Error("User not found")
    }
})

const loginRouter=expressAsyncHandler(async(req,res)=>{
    res.send("login Route")
})
module.exports={registerRouter,loginRouter,getRouter,updateRouter,deleteRouter,getRouters}
