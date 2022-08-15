const bcrypt = require("bcryptjs");
const Rider = require("../models/riders");

const getAllRiders = async(req,res)=>{
  Rider.find()
  .then(function (banners) {
    res.send({
      data: banners,
      status: 1,
      message: "All Riders",
    });
  })
  .catch(function (e) {
    res.send(e);
  });
}

const riderLogin = async (req, res) => {
  const body = req.body;
  const isRider = await Rider.findOne({ email: body.email });
  if (isRider) {
    const passwordMatched = await bcrypt.compare(
      body.password,
      isRider.password
    );
    if (passwordMatched) {
      res.json({
        status: 1,
        message: "Login Successfull",
        data: isRider,
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
      message: "Rider not found",
    });
  }
};

const riderRegister = async (req, res) => {
  const saltRounds = 10;
  const body = req.body;
  const hashedpassword = await bcrypt.hash(body.password, saltRounds);
  const emailexist = await Rider.findOne({ email: body.email });
  const contactexist = await Rider.findOne({ email: body.contact });
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
    const riderData = new Rider({
      name: body.name,
      email: body.email,
      password: hashedpassword,
      contact: body.contact,
    }).save();
    if (riderData) {
      console.log(riderData);
      res.json({
        status: 1,
        message: "Rider Added",
        data: true,
      });
    }
    else {
      res.json({
        status: 4,
        message: "Something went wrong",
        data: false,
      })}
  }
};

const deleteRider = (req, res) => {
  let id = req.query.id;
   Rider.findOneAndDelete({ _id: id }, (err) => {
      if (!err) {
        res.json({
          status: 1,
          message: "Rider Deleted",
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
};

module.exports = { login: riderLogin, register: riderRegister,all:getAllRiders,delete:deleteRider};
