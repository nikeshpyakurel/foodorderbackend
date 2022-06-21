const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
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
    required: false,
  },
  coverimage: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
