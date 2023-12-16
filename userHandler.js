const userHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500
    res.status(statusCode)
    res.send(err.message)

}
module.exports=userHandler;