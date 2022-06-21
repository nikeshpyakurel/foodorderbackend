const mongoose = require("mongoose");

const BannerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bannerimage: {
    type: String,
    required: false,
  },
  enabled: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Banner", BannerSchema);
