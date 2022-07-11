const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  profileimage: {
    type: String,
    default: "",
    required: false,
  },
  coverimage: {
    default: "",
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
