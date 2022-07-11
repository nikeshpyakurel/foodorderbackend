const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  totalprice: {
    type: Number,
    required: true,
  },
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: {
    type: Number,
    required: true,
  },
  deliverylocation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
