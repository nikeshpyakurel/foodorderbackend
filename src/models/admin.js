const mongoose = require("mongoose");

const AdminUserSchema = mongoose.Schema({
  displayname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  phoneno: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model("AdminUser", AdminUserSchema);
