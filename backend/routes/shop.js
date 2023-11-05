let router= require("express").Router();
let shop= require("../model/shops");

router.get("/",async(req,res,next)=>{
    try {
        let data = await shop.find();
        res.send(data);
    } catch (error) {
        
    }
})
router.post("/addshop",(req,res,next)=>{
let {shopName,category,email,password}= req.body;
let newShop=new shop({shopName,category,email,password});
newShop.save();
res.send("shop register successfully");
})
module.exports=router

