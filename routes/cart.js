const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")
const jwt = require('jsonwebtoken');
const Cart = require("../models/Cart");
const bcrypt = require('bcryptjs');

const router = require("express").Router()


// CREATE 

router.post("/",verifyToken, async(req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save()
        res.send(savedCart)

    }catch(err){
        res.send(err)
    }

})

// UPDATE A PRODUCT 

router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
   
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.send(updatedCart)

    }catch(err){
        res.send(err)

    }
    
   
})



router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.send("cart deleted successfuly")

    }catch(err){
        res.send(err)
    }
})

// GET PRODUCT 

router.get("/find/:id",async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.send(product)

    }catch(err){
        res.send(err)
    }
})

// GET USER CART

router.get("/find/:userId",async(req,res)=>{
    
    try{
       const cart = await Cart.findOne({userId:req.params.userId})
       res.send(cart)

    }catch(err){
        res.send(err)
    }
})

router.get("/",verifyTokenAndAdmin, async(req,res)=>{
    try{
        const carts = await Cart.find()
        res.send(carts)

    }catch(err){
        res.send(err)
    }
})


module.exports = router