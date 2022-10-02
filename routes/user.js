const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const bcrypt = require('bcryptjs');

const router = require("express").Router()


router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    if(req.body.password){
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.send(updatedUser)

    }catch(err){

    }
    
   
})
router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.send("user deleted successfuly")

    }catch(err){
        res.send(err)
    }
})
router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc
        res.send(others)

    }catch(err){
        res.send(err)
    }
})

// GET ALL USERS 

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const users = await User.find()
        res.send(users)

    }catch(err){
        res.send(err)
    }
})


module.exports = router