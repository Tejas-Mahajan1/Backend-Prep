var express = require("express");
var router = express.Router();
const userModel = require("../models/UserModel");

let passport = require("passport");
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/profile", isLoggedIn, function (req, res, next) {
  res.render("profile", { msg: "Welcome !! to the Profile Page" });
});

// Authentication Routes

router.post("/register", async function (req, res) {
  let userData = new userModel({
    username: req.body.username,
    password:req.body.password,
    secret: req.body.secret,
  });

  userModel
    .register(userData, req.body.password)
    .then(function (resgisteredUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/users/profile");
      });
    });
});

// Login Route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/profile",
    failureRedirect: "/",
  }),
  function (req, res) {
    res.render("index", { msg: "Welcome !! to the Profile Page" });
  }
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// MiddleWare
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

/* OLD Routes =>

// create
router.get("/create/:username/", async function (req, res) {
  const myUser = await userModel.create({
    username: `${req.params.username}`,
    password: "user@123",
    secret: "User$",
  });
  res.send(myUser);
});

// Find
router.get("/findAll", async function (req, res) {
  const Allusers = await userModel.find({});
  res.send(Allusers);
});

// findOne
router.get("/find/:username", async function (req, res) {
  try {
    const user = await userModel.findOne({
      name: `${req.params.username}`,
    });
    res.send(user);
  } catch (error) {
    console.log(error, "error");
  }
});

// delete
router.get("/delete/:username", async function (req, res) {
  try {
    const deleteuser = await userModel.findOneAndDelete({
      name: `${req.params.username}`,
    });
    res.send(deleteuser);
  } catch (error) {
    console.log(error, "error");
  }
});

*/
module.exports = router;
