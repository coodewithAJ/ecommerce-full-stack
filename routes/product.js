const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const jwt = require('jsonwebtoken');
const Product = require("../models/Product");
const bcrypt = require('bcryptjs');

const router = require("express").Router()


// CREATE 

router.post("/",verifyTokenAndAdmin, async(req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save()
        res.send(savedProduct)

    }catch(err){
        res.send(err)
    }

})

// UPDATE A PRODUCT 

router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
   
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.send(updatedProduct)

    }catch(err){
        res.send(err)

    }
    
   
})



router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.send("product deleted successfuly")

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

// GET ALL PRODUCTS

router.get("/",async(req,res)=>{
    const qNew = req.query.new;
    const qCategory =  req.query.category
    try{
        let products;
        
        if(qNew){
            products = await Product.find().sort({createdAt:-1}).limit(5)
        }else if(qCategory){
            products = await Product.find({categories:{
                $in:[qCategory]
            }})
        }else{
            products = await Product.find()
        }

        res.send(products)

    }catch(err){
        res.send(err)
    }
})


module.exports = router