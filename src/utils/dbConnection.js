const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect("mongodb+srv://pieonion:db%40pieonion@pieonion.rylv00g.mongodb.net/pieonion", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { connect };
