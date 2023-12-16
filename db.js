const mongoose = require("mongoose")
const dotenv=require('dotenv')

const connectDB=async()=>{
    try{

        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`connected ${conn.connection.host}`)
    }
    catch(err){
        console.log(err.message)
        process.exit(1)
    }
}
       
module.exports=connectDB;
