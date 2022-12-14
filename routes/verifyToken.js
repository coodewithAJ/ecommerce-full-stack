const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token 
    if(!authHeader){
        return res.send("You are not authenticated")
    }else{
        const token = authHeader.split(" ")[1];
        
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err){
                res.send("Token is not valid")
            }else{
                req.user = user
                next()
            }

        })
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
   verifyToken(req,res,()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        next()
    
    }else(
        res.send("You are not allowed to do that")
    )

   })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
     if(req.user.isAdmin){
         next()
     
     }else(
         res.send("You are not allowed to do that")
     )
 
    })
 }

module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}