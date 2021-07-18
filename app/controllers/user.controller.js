const db = require("../models/models");
const bcrypt = require("bcryptjs");
const { Register } = require("../utils/registerValidate");

const saltRounds = 10;

exports.RegisterUser = async (req, res) => {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  let userInfo = {
    email: req.body.email,
    password: encryptedPassword,
    repeat_password: encryptedPassword,
  };
  req.body.password;

  let { error } = Register(req.body);
  if (error) {
    req.flash("error", error.details[0]["message"]);
    res.redirect("back");
  } else {
    await db.emailValidate(userInfo.email, async (err, result) => {
      if (err) {
        req.flash("error", "Network Error");
        res.redirect("back");
      } else if (!Object.entries(result).length == 0) {
        req.flash("error", "Email Already Exist");
        res.redirect("back");
      } else {
        await db.insertUsers(userInfo, (err, result) => {
          if (err) {
            console.log(err);
            req.flash("error", "Network Error");
            res.redirect("back");
          } else {
            res.redirect("/login");
          }
        });
      }
    });
  }
};

exports.photoUpload = async (req, res) => {
  res.render("photoUpload", {
    error: req.flash("error"),
  });
};


exports.image = (req, res) => {
  // console.log(req.files)
  let { name, mimetype, mv } = req.files.profile;
  let { img } = req.body;
  let { user_id } = req.user;
  let imagePath = "receiptImg/" + name;
  const imageParams = [
    "image/png",
    "image/jpg",
    "image/JPG",
  ];

  imageParams.includes(mimetype)
    ? (mv("public/profileImg/" + name),
      db.userReceipts(imagePath, "pending", img, user_id, (err, result) => {
        err
          ? (req.flash("error", "image uploaded successfully"),
            res.redirect("back"))
          : (req.flash(
              "error",
             
            ),
            res.redirect("/runningPlans"));
      }))
    : (req.flash("error", "kindly select valid image format"),
      res.redirect("back"));
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
