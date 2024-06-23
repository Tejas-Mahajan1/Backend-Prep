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
    nickname: "Tj07",
    description:
      "Passionate gamer and skilled coder, blending creativity with technical prowess.",
    categories: ["Gamer", "CSGO"],
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
      $all: ["CSGO", "JavaScript", "React", "NextJs", "Valorant"],
    },
  });
  if (customers.length !== 0) {
    res.json(customers);
  } else {
    res.render("index", { msg: "No Customers as you search" });
  }
});

// 3. Serach for documents with specific date range in mongoose.
router.get("/find3", async function (req, res) {
  var date1 = new Date("2024-06-19");
  var date2 = new Date("2024-06-20");

  let customers = await customerModel.find({
    datecreated: { $gte: date1, $lte: date2 },
  });

  res.json(customers);
});

// 4. Filter Documents based on the existence of the field
router.get("/find4", async function (req, res) {
  let customers = await customerModel.find({
    categories: { $exists: true },
  });

  res.json(customers);
});

// 5. Filter Document based on the on specific field's length
router.get("/find5", async function (req, res) {
  let customers = await customerModel.find({
    categories: { $size: 2 },
  });

  res.json(customers);
});

// Another Solution =>

// 5. Filter Document based on the on specific field's length
router.get("/find6", async function (req, res) {
  let customers = await customerModel.find({
      $expr:{
        $and:[
          {$gte:[{$strLenCP:'$nickname'},0]},
          {$lte:[{$strLenCP:'$nickname'},5]}
        ]
      }
  });

  res.json(customers);
});

module.exports = router;
