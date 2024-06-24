var express = require("express");
var router = express.Router();
const userModel = require("../models/UserModel");



/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { msg: "Welcome !! TO THE BACKEND PREP" });
  res.render("register")
});


/* Old Routes =>

// using flash connect
router.get("/failed", function (req, res, next) {
  req.flash("age", 22);
  req.flash("Name", "Tejas"); // Syntax req.flash (Name,Value) & Name will always a string
  res.render("index", { msg: "Welcome !! Flash Created" });
});

router.get("/checkF", function (req, res, next) {
  console.log(req.flash("age"), req.flash("Name"));
  res.render("index", { msg: "Check Backend Console" });
});

router.get("/auth", async function (req, res) {
  // session creation
  req.session.ban = true;

  // creating Cookie
  //res.cookie("Name",value) Syntax
  // Here Name must always a String ex. "Tj","Tejas"

  res.cookie("Tj", "In-Game-Name");

  res.render("auth");
});

router.get("/read", function (req, res) {
  // reading the cookies
  console.log(req.cookies);
  res.send("Check Backend Console !!");
});

router.get("/checkban", function (req, res, next) {
  // session reading
  if (req.session.ban === true) {
    res.send(`<h2>You are Banned</h2>`);
  } else {
    res.send(`<h2>You are Free</h2>`);
  }
});

router.get("/removeban", function (req, res, next) {
  // session destorying
  req.session.destroy(function (err) {
    if (err) throw err;
    res.send("<h2>Ban Removed</h2>");
  });
});

router.get("/deleteC", function (req, res) {
  // Deleting Cookie
  res.clearCookie("Tj");
  res.send("<h2>Cookie Removed</h2>");
});

*/

module.exports = router;
