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
  isdeleted:{
      type:Boolean,
      default:false
  }
});

module.exports = mongoose.model("Category", CategorySchema);
