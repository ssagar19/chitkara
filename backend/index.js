let express = require("express");
let app= express();
let mongoose= require("mongoose");
var cors = require('cors');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./model/User');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
let PORT=3000;

const authController = require("./authController");
const adminController = require("./adminAuth");


app.post("/signup", authController.signup_post);
app.post("/login", authController.login_post);
app.get("/logout", authController.logout_get);
app.post("/create-admin", adminController.signup_post);
app.post("/admin", adminController.login_post);
app.get("/admin-logout", adminController.logout_get);


const requireAuth = (req, res, next) =>{
  const token1 = req.cookies.jwt;
  var token2 = false;
  if(!req.cookies.email){
    res.send('No user is Authorised')
  }
  User.find({email : req.cookies.email}).then(val =>{
    if(val[0].role === 'admin'){
      token2 = true;
      if(token1 && token2){
        jwt.verify(token1,'kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls', (err, decodedToken) =>{
          if(err){
          
            console.log(err.message);
          }else{
            next();
          }
        });
          }
          else{
            res.send('404 error no user in authorised');
          }
    }

    });

};

app.get('/', (req, res) =>{
  res.send('server connected')
})

app.use("/shops", requireAuth, require("./routes/shop"))




mongoose.connect("mongodb+srv://nitesh:nitesh@cluster0.udw6wpu.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    app.listen(PORT ,(req,res)=>{
        console.log("server started")
      })
})
