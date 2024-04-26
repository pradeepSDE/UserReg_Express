// const mongoose = require('mongoose');
var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/TestDB");

const userSchema = mongoose.Schema({
  UserName: String,
  password : String,
  secret : String

});
userSchema.plugin(plm)
module.exports = mongoose.model("users", userSchema);

// module.exports = router;
