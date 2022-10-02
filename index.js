const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")
const stripeRouter = require("./routes/stripe")
const cookieParser = require('cookie-parser')



const cors = require("cors")
dotenv.config()
const app = express();
app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use("/api/auth",authRouter)
app.use("/api/products",productRouter)
app.use("/api/users",userRouter)
app.use("/api/carts",cartRouter)
app.use("/api/orders",orderRouter)
app.use("/api/checkout",stripeRouter)
app.get("/",(req,res)=>{
    res.send("working properly")
})


mongoose.connect(process.env.MONGO_URI,()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log("server is running and connected to database")
    })
})
