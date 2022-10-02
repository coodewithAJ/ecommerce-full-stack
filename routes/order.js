const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")
const jwt = require('jsonwebtoken');
const Order = require("../models/Order");
const bcrypt = require('bcryptjs');

const router = require("express").Router()


// CREATE 

router.post("/",verifyToken, async(req,res)=>{
    const newOrder = new Order(req.body)
    try{
        const savedOrder = await newOrder.save()
        res.send(savedOrder)

    }catch(err){
        res.send(err)
    }

})

// UPDATE 

router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
   
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.send(updatedOrder)

    }catch(err){
        res.send(err)

    }
    
   
})



router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.send("cart deleted successfuly")

    }catch(err){
        res.send(err)
    }
})

// GET a order

router.get("/find/:userId",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const orders = await Order.find(req.params.id)
        res.send(orders)

    }catch(err){
        res.send(err)
    }
})

// GET all orders

router.get("/",verifyTokenAndAdmin, async(req,res)=>{
    
    try{
       const orders = await Order.find()
       res.send(orders)

    }catch(err){
        res.send(err)
    }
})


module.exports = router