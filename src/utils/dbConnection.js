const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect("mongodb://34.227.78.172:27017/resturantapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { connect };
