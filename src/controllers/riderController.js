const bcrypt = require("bcryptjs");
const Rider = require("../models/riders");

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
      name: body.displayname,
      email: body.email,
      password: hashedpassword,
      contact: body.contact,
    }).save();

    if (riderData) {
      res.json({
        status: 1,
        message: "Rider Added",
        data: true,
      });
    }
  }
};

module.exports = { login: riderLogin, register: riderRegister};
