let router= require("express").Router();


router.post("/addshop",(req,res,next)=>{
let {shopname,category,email,password}= req.query;
let newShop=new shop(shopname,category,email,password);
newShop.save();
res.send("shop register successfully");
})
module.exports=router

