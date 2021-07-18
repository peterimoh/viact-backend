const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db =  require("../models/models")

    passport.use('login', new LocalStrategy(
      async function (username, password, done) {
        let userInfo = {
            email: username,
            password: password
          }
        await db.emailValidate(userInfo.email, async(err, result) => {
            if (err) { done(err) }
            else {
              if (result.length > 0) {
                const hash = result[0].password.toString();
                bcrypt.compare(userInfo.password, hash, function (err, response) {
                    
                    if (response === true) {
                        return done(null, { user_id: result[0].id }, { message: "Successful login" })
                    }
                    else { return done(null, false, { message: "Incorrect Password" }) }
                })
              }
              else {
                 return done(null, false, { message: "Email and Password does not exist. register to create account " }) 

              }
            }
          })
  
      }
  ))
  passport.serializeUser(function (user_id, done) {
      done(null, user_id)
  });
  passport.deserializeUser(function (user_id, done) {
      done(null, user_id)
  });

