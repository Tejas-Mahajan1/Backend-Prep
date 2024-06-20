const mongoose = require("mongoose");
const moment = require("moment");

mongoose.connect("mongodb://127.0.0.1:27017/backendPrepDB");

const customerschema = mongoose.Schema({
  username: String,
  nickname: String,
  description: String,
  categories: {
    type: Array,
    default: [],
  },
  datecreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("customers", customerschema);
