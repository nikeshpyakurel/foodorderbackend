const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  totalprice: {
    type: Number,
    required: true,
  },
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
