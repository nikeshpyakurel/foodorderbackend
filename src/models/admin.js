const mongoose = require("mongoose");

const AdminUserSchema = mongoose.Schema({
  displayname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  phoneno: {
    type: Number,
    required: false,
    default: 0000000000,
  },
  logo: {
    type: String,
    required: false,
    default: "",
  },
  devicetoken: {
    type: String,
    required: false,
    default: "",
  },
});

module.exports = mongoose.model("AdminUser", AdminUserSchema);
