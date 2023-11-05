let mongoose = require("mongoose");

let userSchema= mongoose.Schema({
    shopName:String,
    category:String,
    email:String,
    password:String
})

module.exports=mongoose.model("shop",userSchema);