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
  const category = req.body;
  if (category.coverimage) {
    let base64Image = category.coverimage.split(";base64,").pop();
    fs.writeFile(
      `uploads/${category.name.replace(" ", '-').toLowerCase()}-category.png`,
      base64Image,
      { encoding: "base64" },
      function (err) {
        console.log(err);
      }
    );
    Category({
      name: category.name,
      isdeleted: false,
      coverimage: category.coverimage
        ? `/uploads/${category.name.replace(" ", '-').toLowerCase()}-category.png`
        : "",
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

const updateCategories = async (req, res) => {
  let id = req.query.id;
  console.log(id, req.body.name);
  if (id && req.body.name) {
    try {
      Category.findOneAndUpdate(
        { _id: id },
        { name: req.body.name },
        { new: true },
        (err, category) => {
          if (category) {
            res.send({
              status: 1,
              message: "Category Name Updated",
              data: true,
            });
          }
        }
      );
    } catch (error) {
      res.json({
        status: 4,
        message: error.message,
        data: false,
      });
    }
  } else {
    res.json({
      status: 4,
      message: "Provide Category Id in params and name in body",
      data: false,
    });
  }
};

const updateCategoryCoverImage = async (req, res) => {
  // let id = req.query.id;
  // if (req.body.coverimage && id) {
  //   let base64Image = req.body.coverimage.split(";base64,").pop();
  //   fs.writeFile(
  //     `uploads/categories/${req.body.name}.png`,
  //     base64Image,
  //     { encoding: "base64" },
  //     function (err) {
  //       console.log(err);
  //     }
  //   );
  //   Category.findOneAndUpdate(
  //     id,
  //     { coverimage: `/uploads/categories/${req.body.name}.png` },
  //     { new: true },
  //     (err, category) => {
  //       console.log(category);
  //       if (!err) {
  //         res.json({
  //           status: 1,
  //           message: "Category Coverimage Updated",
  //           data: true,
  //         });
  //       } else {
  //         res.json({
  //           status: 4,
  //           message: err.message,
  //           data: false,
  //         });
  //       }
  //     }
  //   );
  // } else {
  //   res.json({
  //     status: 4,
  //     message: "Provide Category Id in params and coverimage in base64",
  //     data: true,
  //   });
  // }
};

const deleteCategory = (req, res) => {
  let id = req.query.id;
  if (id) {
    Category.findOneAndUpdate(
      { _id: id },
      { isdeleted: true },
      { new: true },
      (err, product) => {
        if (product) {
          res.json({
            status: 1,
            message: "Product Image deleted",
            data: true,
          });
        } else {
          res.json({
            status: 4,
            message: err.message,
            data: false,
          });
        }
      }
    );
  } else {
    res.json({
      status: 4,
      message: "Provde Category Id",
      data: true,
    });
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategories,
  updateCategoryCoverImage,
  deleteCategory,
};
