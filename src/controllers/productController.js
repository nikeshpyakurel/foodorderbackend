const Product = require("../models/product");

const getProducts = (req, res) => {
  Product.find()
    .then(function (products) {
      res.send({
        data: products,
        status: 1,
        message: "All products",
      });
    })
    .catch(function (e) {
      res.send(e);
    });
};

const addProduct = (req, res) => {
  const product = req.body;
  const toAddProduct = new Product({
    title: product.title,
    image: product.coverimage ? product / product.coverimage : "",
    description: product.desciption,
    price: product.price,
    categoryid: product.categoryid,
  }).save();
  if (toAddProduct) {
    res.json({
      status: 1,
      message: "products Added",
    });
  }
};


module.exports = {addProduct,getProducts};