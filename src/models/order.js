const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  totalprice: {
    type: Number,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity:Number
    },
  ],
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
  createdat: {
    type: Date,
    default:  new Date()
}
});

module.exports = mongoose.model("Order", OrderSchema);
