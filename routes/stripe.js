
const router = require("express").Router();
const stripe = require("stripe",("sk_test_51LZC22SDRXc55Qi9ikiofK3iwvozQ56B7XOw6mxu6pjbDkAJUgkolpDMiTO2JWwCsPDWHM9NKRU8KyRyqDWfmpaJ004hb76RB5"));

router.post("/payment",async(req,res)=>{
    await stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd",
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.send(stripeErr)
        }else{
            res.send(stripeRes)
        }
    })
})


module.exports = router;