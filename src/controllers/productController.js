const Product = require("../models/product");
const fs = require("fs");

const getProducts = (req, res) => {
  Product.find()
    .populate("categoryid")
    .then(function (products) {
      res.json({
        data: products,
        status: 1,
        message: "All products",
      });
    })
    .catch(function (e) {
      res.json(e);
    });
};

const addProduct = (req, res) => {
  const product = req.body;
  if (product.image) {
    let base64Image = product.image.split(";base64,").pop();
    if (product.title && product.price && product.categoryid) {
      fs.writeFile(
        `./public/assets/${product.title}-product.png`,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      const toAddProduct = new Product({
        title: product.title,
        image: product.image ? `uploads/products/${product.title}.png` : "",
        description: product.desciption ? product.desciption : "",
        price: product.price,
        categoryid: product.categoryid,
        available: true,
      }).save();
      if (toAddProduct) {
        res.send({
          status: 1,
          message: "products Added",
          data: true,
        });
      }
    } else {
      res.send({
        status: 4,
        message: "Add Product Details",
        data: false,
      });
    }
  } else {
    res.send({
      status: 4,
      message: "Add Product Image",
      data: false,
    });
  }
};

const deleteProduct = (req, res) => {
  let id = req.query.id;
  if (id) {
    Product.findOneAndDelete({ _id: id }, (err) => {
      if (!err) {
        res.json({
          status: 1,
          message: "Product Deleted",
          data: true,
        });
      } else {
        res.json({
          status: 4,
          message: `${err}`,
          data: true,
        });
      }
    });
  } else {
    res.send({
      status: 4,
      message: "Add Product Image",
      data: false,
    });
  }
};

const updateProductImage = async (req, res) => {
  let id = req.query.id;
  if (req.body.image && id) {
    let base64Image = req.body.image.split(";base64,").pop();
    fs.writeFile(
      `uploads/products/${req.body.name}-id.png`,
      base64Image,
      { encoding: "base64" },
      function (err) {
        console.log(err);
        if (err == null) {
          Product.findOneAndUpdate(
            { _id: id },
            { image: `uploads/products/${req.body.name}-id.png` },
            { new: true },
            (err, product) => {
              if (product) {
                res.json({
                  status: 1,
                  message: "Product Image Updated",
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
        }
      }
    );
  } else {
    res.json({
      status: 4,
      message: "Provide Product Id in params and image in base64 format",
      data: false,
    });
  }
};

const updateProductAvailableStatus = async (req, res) => {
  let id = req.query.id;
  let status = req.query.status;
  if (id) {
    Product.findByIdAndUpdate(
      { _id: id },
      { available: status == 1 ? true : false },
      { new: true },
      (err, product) => {
        if (product) {
          res.send({
            status: 1,
            message: "Status Updated",
            data: true,
          });
        }
        if (err) {
          res.send({
            status: 4,
            message: err.message,
            data: false,
          });
        }
      }
    );
  } else {
    res.send({
      status: 4,
      message: "Send Id as query params",
      data: false,
    });
  }
};

const updateProductDetails = async (req, res) => {
  let id = req.query.id;
  let detail = req.body;
  if (id) {
    Product.findByIdAndUpdate(
      { _id: id },
      {
        title: detail.title,
        price: detail.price,
        categoryid: detail.categoryid,
      },
      { new: true },
      (err, product) => {
        if (product) {
          res.send({
            status: 1,
            message: "Status Updated",
            data: true,
          });
        }
        if (err) {
          res.send({
            status: 4,
            message: err.message,
            data: false,
          });
        }
      }
    );
  } else {
    res.send({
      status: 4,
      message: "Send Id as query params",
      data: false,
    });
  }
};

module.exports = {
  add: addProduct,
  get: getProducts,
  delete: deleteProduct,
  updateImage: updateProductImage,
  updateAvailableStatus: updateProductAvailableStatus,
  updateProductDetails: updateProductDetails,
};
