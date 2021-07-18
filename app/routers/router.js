const passport = require("passport");
const usersRoutes = require("../controllers/user.controller");
const { autheticationMiddleware } = require("../utils/auth");
require("../utils/passport");
const { usersAuthRoutes} = require("../utils/auth");

const Routers = (app) => {
  return (routers = (paths, filename) => {
    app.get(paths, (req, res) =>
      res.render(filename, {
        error: req.flash("error"),
        isAuthenticated: req.isAuthenticated() && req.user.user_id,
      })
    );
    app.post("/register", usersRoutes.RegisterUser);

    app.post(
      "/login",
      passport.authenticate("login", {
        successRedirect: "/photo",
        failureRedirect: "back",
        failureFlash: true,
        successFlash: true,
      })
    );
    
  });
};

const authRouters = (app) => {
  return (routers = (paths, filename) => {
    usersAuthRoutes(app)(paths, autheticationMiddleware, usersRoutes[filename]);
    app.post("/upload", autheticationMiddleware(), usersRoutes.image);
 
  });
};

module.exports = (app) => {
  Routers(app)("/", "index");
  Routers(app)("/login", "login");
  Routers(app)("/register", "register");
  

  authRouters(app)("/photo", "photoUpload", usersRoutes);
  authRouters(app)("/upload", "image", usersRoutes);
  authRouters(app)("/logout", "logout", usersRoutes);
};
