var express = require("express");
var router = express.Router();
const userModel = require("../models/UserModel");
const customerModel = require("../models/customerModel");

router.get("/", function (req, res, next) {
  res.render("index", { msg: "Customer Route" });
});

router.get("/create", async function (req, res, next) {
  const createdCustomer = await customerModel.create({
    username: "Tejas",
    nickname: "CaptainTj",
    description:
      "Passionate gamer and skilled coder, blending creativity with technical prowess.",
    categories: ["CSGO", "JavaScript", "React", "NextJs"],
  });

  if (createdCustomer) {
    res.render("index", { msg: "Customer Created" });
    console.log(createdCustomer);
  } else {
    res.render("index", { msg: "Customer is not Created" });
  }
});


router.get("/getAll", async function (req, res) {
  const customers = await customerModel.find();
  if (customers) {
    res.json(customers);
  } else {
    res.render("index", { msg: "Zero Customers" });
  }
});



// 1. Case-Insensitive Search in Mongoose =>
router.get("/find1/:nickname", async function (req, res) {
  let nickName = new RegExp(`^${req.params.nickname}$`, "i");
  const customers = await customerModel.find({
    nickname: nickName,
  });
  if (customers.length !== 0) {
    res.json(customers);
  } else {
    res.render("index", { msg: "No Customers as you search" });
  }
});

// 2.Find Document where an array field contains all of set of values
router.get("/find2", async function (req, res) {
  const customers = await customerModel.find({
    // nickname: "TjBhai",
    categories: {
      $all: ["CSGO", "JavaScript", "React", "NextJs","Valorant"],
    },
  });
  if (customers.length !== 0) {
    res.json(customers);
  } else {
    res.render("index", { msg: "No Customers as you search" });
  }
});

// 3. Serach for documents with specifix date range in mongoose.
router.get("/find3", async function (req, res) {

});

module.exports = router;
