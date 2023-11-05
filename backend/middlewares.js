const User = require('./model/User');
var jwt = require('jsonwebtoken');
const requireAuth = (req, res, next) =>{
    const token1 = req.cookies.jwt;
    var token2 = false;
    if(!req.cookies.email){
      res.send('No student is Authorised')
    }
    User.find({email : req.cookies.email}).then(val =>{
      if(val[0].role === 'admin'){
        token2 = true;
        if(token1 && token2){
          jwt.verify(token1,'kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls', (err, decodedToken) =>{
            if(err){
              console.log('huhiuiuhihiuhihu');
              console.log(err.message);
            }else{
              next();
            }
          });
            }
            else{
              res.send('404 error no student in authorised');
            }
      }
  
      });
  
  };
  module.exports = {requireAuth};