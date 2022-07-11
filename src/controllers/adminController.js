const bcrypt = require("bcryptjs");
const AdminUser = require("../models/admin");

const adminLogin = async (req, res) => {
  const body = req.body;
  const isadmin = await AdminUser.findOne({ email: body.email });
  if (isadmin) {
    const passwordMatched = await bcrypt.compare(
      body.password,
      isadmin.password
    );
    if (passwordMatched) {
      res.json({
        status: 1,
        message: "Login Successfull",
        data: isadmin,
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
};

const adminRegister = async (req, res) => {
  const saltRounds = 10;
  const body = req.body;
  const hashedpassword = await bcrypt.hash(body.password, saltRounds);

  const adminUser = new AdminUser({
    displayname: body.displayname,
    email: body.email,
    password: hashedpassword,
  }).save();

  if (adminUser) {
    res.json({
      status: 1,
      message: "Admin Added",
      data: true,
    });
  }
};

module.exports = { login: adminLogin, register: adminRegister };
