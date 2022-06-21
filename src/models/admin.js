const mongoose = require("mongoose");

const AdminUserSchema = mongoose.Schema({
  displayname: {
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
});

module.exports = mongoose.model("AdminUser", AdminUserSchema);
