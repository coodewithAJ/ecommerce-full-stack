const router = require("express").Router()
const User =  require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// REGISTER 

router.post("/register",async(req,res)=>{
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({...req.body,password:hash})
    try{
        
        const savedUser = await newUser.save()
        res.send(savedUser)

    }catch(err){
        res.send(err)
    }

})

// LOGIN 
router.post("/login",async(req,res)=>{
    try{
        
        const user = await User.findOne({ username: req.body.username });
        if(user){
            const isCorrect = bcrypt.compareSync(req.body.password, user.password);
            
            if(isCorrect){
                
                const {password,...others} = user._doc
                const accessToken = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SEC)
                res.cookie("access_token",accessToken,{
                    httpOnly:true
                })
                res.send({...others,accessToken})
            }
        }

    
        
       
        // if(!user){
        //     res.json("please create account first")
            
           
        // }else{
            
        //     const isCorrect = bcrypt.compareSync(req.body.password, user.password);
            
        //     if(!isCorrect){
        //         res.send("wrong credentials")
        //     }else{
        //         const {password,...others} = user._doc
        //         const accessToken = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SEC)
        //         res.send({...others,accessToken})
        //     }
            
          
        // }

    }catch(err){
        res.send(err)
    }
})




module.exports = router