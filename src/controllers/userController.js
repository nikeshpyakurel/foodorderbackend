const bcrypt = require("bcryptjs");
const Users = require("../models/users");
const fs = require("fs");

const getUsers = async (req, res) => {
  Users.find()
    .then(function (banners) {
      res.send({
        data: banners,
        status: 1,
        message: "All Users",
      });
    })
    .catch(function (e) {
      res.send(e);
    });
};

const getUsersById = async (req, res) => {
  let id = req.query.id;
  if (id) {
    Users.findById(id)
      .then(function (user) {
        res.send({
          data: user,
          status: 1,
          message: "user",
        });
      })
      .catch(function (e) {
        res.json({
          status: 4,
          message: "User not found",
        });
      });
  }
};

const userLogin = async (req, res) => {
  console.log(req.body);

  const body = req.body;
  if (body.email && body.password) {
    try {
      const isuser = await Users.findOne({ email: body.email });
      if (isuser) {
        const passwordMatched = await bcrypt.compare(
          body.password,
          isuser.password
        );
        if (passwordMatched) {
          res.json({
            status: 1,
            message: "User Login Successfull",
            data: isuser,
          });
        } else {
          res.json({
            status: 4,
            message: "Password doesnot match",
          });
        }
      } else {
        res.json({
          status: 4,
          message: "User not found",
        });
      }
    } catch (error) {
      res.json({
        status: 4,
        message: error.message,
      });
    }
  } else {
    res.json({
      status: 4,
      message: "Enter email and password",
    });
  }
};

const userRegister = async (req, res) => {
  console.log(req.body);
  const saltRounds = 10;
  const body = req.body;
  const hashedpassword = await bcrypt.hash(body.password, saltRounds);
  const emailexist = await Users.findOne({ email: body.email });
  const contactexist = await Users.findOne({ email: body.contact });
  if (emailexist) {
    return res.json({
      status: 4,
      message: "Email already exists",
      data: false,
    });
  } else if (contactexist) {
    return res.json({
      status: 4,
      message: "Contact already exists",
      data: false,
    });
  } else {
    if (
      body.name &&
      body.email &&
      body.password &&
      body.contact &&
      body.address
    ) {
      const newuser = new Users({
        name: body.name,
        email: body.email,
        password: hashedpassword,
        contact: body.contact,
        address: body.address,
      }).save();
      if (newuser) {
        res.json({
          status: 1,
          message: "User Registered",
          data: true,
        });
      } else {
        res.json({
          status: 4,
          message: "Something went wrong",
          data: false,
        });
      }
    } else {
      res.json({
        status: 4,
        message: "Enter all required fields",
        data: false,
      });
    }
  }
};

const updateUserProfileImage = async (req, res) => {
  let id = req.query.id;
  console.log(id);
  console.log(req.body.profileimage);
  var date = new Date();
  if (req.body.profileimage && id) {
    try {
      let base64Image = req.body.profileimage.split(";base64,").pop();
      fs.writeFile(
        `./public/assets/${req.query.id}-profileimage${date}.png`,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      Users.findOneAndUpdate(
        { _id: id },
        {
          profileimage: `./public/assets/${req.query.id}-profileimage${date}.png`,
        },
        { new: true },
        (err, user) => {
          if (user) {
            res.json({
              status: 1,
              message: "User ProfileImage Updated",
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
    } catch (err) {
      console.log(err);
      res.send({ status: 4, message: err.message });
    }
  } else {
    res.json({
      status: 4,
      message: "Provide User Id in params and profileimage in base64",
      data: true,
    });
  }
};

const updateUserDetails = async (req, res) => {
  let id = req.query.id;
  let detail = req.body;
  if (id) {
    Users.findByIdAndUpdate(
      { _id: id },
      {
        name: detail.name,
        email: detail.email,
        address: detail.address,
        contact: detail.contact,
      },
      { new: true },
      (err, user) => {
        if ((err, user)) {
          res.send({
            status: 1,
            message: "User Data Updated",
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
      message: "Send User Id as query params",
      data: false,
    });
  }
};

module.exports = {
  userLogin,
  userRegister,
  updateUserProfileImage,
  getUsers,
  getUsersById,
  updateUserDetails,
};
