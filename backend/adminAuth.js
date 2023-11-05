const Users = require("./model/User");
var jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; //age of cookie to expire automatically

const createToken = (usr) => {
  console.log(usr);
  let params = {
    email: usr.email,
    password: usr.password
  };
  return jwt.sign(params, "kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls", { expiresIn: maxAge });
};

module.exports.signup_post = (req, res) => {
  const { gname, pw } = req.body;
  console.log('this ran');
  Users.find({ email: gname })
    .then((user) => {
      console.log(user);
      if (user.length >= 1) {
        console.log("This Mail ALready Exists");
        res.status(409).json({
          message: "This Mail ALready Exists",
        });
      } else {
        if(!gname){
          res.status(401).json({message : 'please enter email'});
        }
           else{
               console.log('hi');
            Users.create({ email: gname, password: pw, role: 'admin'})
            .then((usr) => {
              res.json({ usr: usr._id, message: 'user has been successfully registered' });
            });
           
           }
      }
    }).catch((err) => {
      handleError(err);
      res.status(400).send("error, user not created");
    });
    
};

module.exports.login_post = (req, res) => {
  const { gname, pw } = req.body;
  Users.login(gname, pw)
    .then((u) => {
      if (u === "password did not match") {
        res.status(401).json({ message: "password did not match" });
      } else if (u === "Cannot read property password of null") {
        res.status(400).json({ message: "please enter valid email and passwor" });
        console.log("please enter valid email and password");
      } else {
        const token = createToken(u);
        res.cookie("jwt", token, { maxAge: maxAge * 1000 });
        res.json({ user: u._id });
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      res.json({message : 'error handled'});
    });
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("role", "", { maxAge: 1 });
  res.redirect("/");
};