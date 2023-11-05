const mongoose = require("mongoose");

const { isEmail } = require("validator");
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter an password"],
    minlength: [6, "minimum password length is 6 characters"],
  },
  role:{
    type:String,
    default: 'admin'
  }
});

adminSchema.statics.login = function (email, password) {
  return Admin.findOne({ email: email })
    .then((user) => {
      if (password == user.password) {
        return user;
      } else {
        return "password did not match";
      }
    })
    .catch((err) => {
      return "Cannot read property password of null";
    });
};

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;