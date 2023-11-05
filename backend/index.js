let express = require("express");
let mongoose= require("mongoose");
let PORT=3000;



let app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) =>{
  res.send('server connected')
})

app.use("/shops", require("./routes/shop"))




mongoose.connect("mongodb+srv://nitesh:nitesh@cluster0.udw6wpu.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    app.listen(PORT ,(req,res)=>{
        console.log("server started")
      })
})
