var express = require("express");
// const mongoose = require('mongoose');
const localstrategy = require("passport-local")
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
passport.use(new localstrategy(userModel.authenticate()))
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login",passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function(req, res) { })

router.get("/profile",isLoggedIn , function (req, res) {
  res.render("login");
});
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect("/")
}

router.post('/register',function(req,res){
var userData = new userModel({
  username : req.body.username,
  secret : req.body.secret
})
userModel.register(userData, req.body.password)
.then(function(registereduser){
  passport.authenticate("local")(req, res, function( ) {
    res.redirect('/profile')
  })
})
})

router.get('/logout' ,function(req,res,next){
  req.logout(function(err){
    if(err){return next(err)}
    res.redirect('/')
  })
})

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect("/")

}

router.get("/create", async function (req, res) {
  let User = await userModel.create({
    UserName: "cutieh",
    Nickname : "codecutie",
    description: "Designer",
    categories: ['figma ','canva','illustarator' ]
   
  });
  res.send(User);
});

router.get("/find", async function (req, res) {
  
  // let regex = RegExp("^cutie$",'i')
  // let user = await userModel.find({UserName:regex})

  // let user = await userModel.find({categories : {$all : ["nodejs","tensorflow"]}})

  // let date1 = new Date('2024-04-25')
  // let date2 = new Date('2024-04-26')
  // let user = await userModel.find({datecreated: {$gte : date1 , $lte: date2}})

  // let user = await userModel.find({categories : {$exists: true}})
  let user = await userModel.find({
    $expr: {
      $and : [
        {$gte :[{$strLenCP : '$Nickname'},3]},
        {$lte :[{$strLenCP : '$Nickname'},6]}
      ]
    }
  })
  res.send(user)
});

module.exports = router;
