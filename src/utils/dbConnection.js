const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/resturantapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { connect };
