const mongoose = require("mongoose");

const RiderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
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
});

module.exports = mongoose.model("Rider", RiderSchema);
