var express = require('express');
var router = express.Router();
const userModel = require("../models/UserModel");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// create
router.get("/create/:username/:name/:age", async function (req, res) {
  const myUser = await userModel.create({
      username: `${req.params.username}`,
      password:"user@123",
      name: `${req.params.name}`,
      age: `${req.params.age}`,
    });
    res.send(myUser)
  });
  
  // Find
  router.get("/findAll",async function(req,res){
    const Allusers = await userModel.find({
    })
   res.send(Allusers)
  })
  
  // findOne
  router.get("/find/:username", async function (req, res) {
    try {
     const user = await userModel.findOne({
       name : `${req.params.username}`
     });
     res.send(user);
    } catch (error) {
     console.log(error,'error')
    }
   });
  
   // delete
  router.get("/delete/:username", async function (req, res) {
    try {
     const deleteuser = await userModel.findOneAndDelete({
       name : `${req.params.username}`
     });
     res.send(deleteuser);
    } catch (error) {
     console.log(error,'error')
    }
   });

module.exports = router;
