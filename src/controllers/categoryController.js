const Category = require("../models/category");
const fs = require("fs");

const getCategories = (req, res) => {
  Category.find()
    .then(function (categories) {
      res.send({
        data: categories,
        status: 1,
        message: "All Categories",
      });
    })
    .catch(function (e) {
      res.send(e);
    });
};

const addCategory = (req, res) => {
  const { category } = req.body;
  const imagepath = "";
  if (category.coverimage) {
    fs.writeFile(
      `uploads/categories/${category.name}.png`,
      category.coverimage,
      { encoding: "base64" },
      function (err) {
        console.log(err);
      }
    );
    Category({
      name: category.name,
      coverimage: category.coverimage ? `uploads/categories/${category.name}.png` : "",
    })
      .save()
      .then((_) => {
        res.json({
          status: 1,
          message: "Categories Added",
        });
      });
  } else {
    res.json({
      status: 4,
      message: "Upload Image",
    });
  }
};

module.exports = { getCategories, addCategory };
