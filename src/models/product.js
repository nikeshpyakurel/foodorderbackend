const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Category"
  },
  image: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  isdeleted:{
      type:Boolean,
      default:false
  }
});

module.exports = mongoose.model("Product", ProductSchema);
