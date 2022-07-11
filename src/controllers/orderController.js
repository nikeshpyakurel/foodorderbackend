const Order = require("../models/order");

const getOrders = (req, res) => {
  Order.find()
    .populate("userid")
    .then(function (orders) {
      res.send({
        data: orders,
        status: 1,
        message: "All Orders",
      });
    })
    .catch(function (e) {
      res.send(e);
    });
};

const getOrderById = (req, res) => {
  let id = req.query.id;
  if (id) {
    Order.findById(id)
      .populate()
      .then(function (order) {
        res.send({
          data: order,
          status: 1,
          message: "order",
        });
      })
      .catch(function (e) {
        res.json({
          status: 4,
          message: "Order not found",
        });
      });
  }
};

module.exports = { getOrders, getOrderById };
