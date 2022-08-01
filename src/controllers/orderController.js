const Order = require("../models/order");

const getOrders = (req, res) => {
  Order.find()
    .populate("products.product", "title image price")
    .populate("userid", "email contact name")
    .then(function (orders) {
      res.send({
        data: orders,
        status: 1,
        message: "All Orders",
      });
    })
    .catch(function (e) {
      res.send({
        status: 4,
        message: e,
      });
    });
};

const deleteAllorders = (req,res)=>{
  Order.deleteMany({}).then(function(){
    res.send({message:'deleted'});
    }).catch(function(error){
     res.send({message:error});
    });
}

const getOrderById = (req, res) => {
  let id = req.query.id;
  if (id) {
    Order.findById({ _id: id })
      .populate("products.product", "title image price")
      .populate("userid", "email contact name")
      .then(function (order) {
        res.send({
          data: order,
          status: 1,
          message: "Order Detail",
        });
      })
      .catch(function (e) {
        res.json({
          status: 4,
          message: "Order not found",
        });
      });
  } else {
    res.json({
      status: 4,
      message: "Provide Order Id",
    });
  }
};

const getUserOrders = (req, res) => {
  let uid = req.query.uid;
  if (uid) {
    Order.find({ userid: uid })
      .populate("products.product", "title image price")
      .populate("userid", "email contact name")
      .then(function (orders) {
        res.send({
          data: orders,
          status: 1,
          message: "Order Detail",
        });
      })
      .catch(function (e) {
        res.json({
          data: e,
          status: 4,
          message: "Order not found",
        });
      });
  } else {
    res.json({
      status: 4,
      message: "Provide Order Id",
    });
  }
};

const createOrder = (req, res) => {
  let uid = req.query.uid;
  if (uid) {
    console.log(req.body);
    productData = [];
    for (const type of req.body.products) {
      productData.push({ quantity: type.quantity, product: type.product });
    }
    console.log(productData);
    Order({
      userid: uid,
      totalprice: req.body.totalprice,
      products: productData,
      status: req.body.status,
      deliverylocation: req.body.deliverylocation,
      createdat: new Date(),
    })
      .save()
      .then((val) => {
        res.send({ data:true,status:1,message:"Order created successfully" });
      })
      .catch((err) => {
        res.send({ message:err,status:4 });
      });
  }
};

const chagneOrderStatus = (req, res) => {
  let id = req.query.oid;
  let status = req.query.status;
  if (id != undefined && status) {
    Order.findById({ _id: id }).then((val) => {
      if (val.status != status) {
        Order.findOneAndUpdate(
          { _id: id },
          { status: status },
          { new: true },
          (err, order) => {
            if (order) {
              res.send({
                status: 1,
                message: "OrderStatus Updated",
                data: true,
              });
            }
          }
        );
      } else {
        res.send({ status: 4, message: "Cant update the Same Order status" });
      }
    });
  } else {
    res.send({
      status: 4,
      message: "Provide order id and status as a parameter",
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  getUserOrders,
  chagneOrderStatus,
  deleteAllorders
};
