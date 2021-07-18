const express = require('express')
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const MySQLStore = require("express-mysql-session")(session);
const options = {
  host: "localhost",
  user: "root",
  database: "viact",
};
const sessionStore = new MySQLStore(options);
const fileupload = require("express-fileupload");

let app = express()
app.use(fileupload({ createParentPath: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(flash());
app.use(
  session({
    secret: "fgnodsfighosfighoghvu",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./app/models/db.config");
require("./app/routers/router")(app);


const port = 5000;
app.listen(port, () => { console.log(`server started at ${port} successfully`) })