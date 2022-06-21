const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coverimage: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
