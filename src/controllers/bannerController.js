const Banners = require("../models/banners");
const fs = require("fs");

const deleteBanner = (req, res) => {
  let id = req.query.id;
};

const getBanners = (req, res) => {
  Banners.find()
    .then(function (banners) {
      res.send({
        data: banners,
        status: 1,
        message: "All banners",
      });
    })
    .catch(function (e) {
      res.send(e);
    });
};

const addBanner = (req, res) => {
  const banner = req.body;
  if (banner.bannerimage) {
    let base64Image = banner.bannerimage.split(";base64,").pop();
    fs.writeFile(
      `uploads/banners/${banner.title}.png`,
      base64Image,
      { encoding: "base64" },
      function (err) {
        console.log(err);
      }
    );
    Banners({
      title: banner.title,
      bannerimage: banner.bannerimage
        ? `uploads/banners/${banner.title}.png`
        : "",
    })
      .save()
      .then((_) => {
        res.json({
          status: 1,
          message: "Banners Added",
        });
      });
  } else {
    res.json({
      status: 4,
      message: "Upload Banner Image",
    });
  }
};

const updateBannerStatus = (req, res) => {
  let id = req.query.id;
  let status = req.query.status;
  if (id) {
    Banners.findByIdAndUpdate(
      { _id: id },
      { enabled: status == 1 ? true : false },
      { new: true },
      (err, banners) => {
        if (banners) {
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

module.exports = { deleteBanner, getBanners, addBanner, updateBannerStatus };
