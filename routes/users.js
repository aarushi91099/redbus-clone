const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bus = require('../models/bus');
//const dashboard = require('../models/dashboard');
const seats = require('../models/seats');
// const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');



const body = require('body-parser');
const secrets = 'mysecret';

var details;
router.post('/register', (req,res) => {
    console.log("hey");
     var newUser = new User({
       name: req.body.name,
       email: req.body.email,
       username: req.body.username,
       password: req.body.password,
     });
     console.log(newUser);

     User.addUser(newUser, (err, user)=> {
       if(err){
         console.log(err);
         res.json({success: false, msg: 'Failed to register'});
       }
       else{
         console.log("Hello");
        res.json({success: true, msg: 'User registered'});
      }
     });
});

router.post('/authenticate', (req,res) => {
  
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + '   '+ password);
  User.getUserByUsername(username, (err, user)=>{
    if(err){
      console.log(err);
      throw err;
    }
    if(!user){
      console.log("User not found");
      return res.json({success: false, msg: 'User not found'});
    }
  
    console.log("Commparing Password");
    User.comparePassword(password,user.password, (err, isMatch)=>{
      console.log(user.password);
      if(err){
        console.log("ERROR");
        console.log(err);
        throw err;
      }
      else  if(isMatch){
          console.log("MATCHING")
          console.log(user);
          const token = jwt.sign({
              id: user._id,
              username: user.username
          }, 
          secrets, {
            expiresIn: 604800
          });
            console.log('................');
            res.json({
            success:true,
            token: `Bearer ${token}`,
            user:{
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            }
          });
        }
          else{
            return res.json({success: false, msg: 'Wrong Password'});
          }
      
      
    });
  });

});
 
router.get('/profile', passport.authenticate('jwt',{session:false}), (req,res,next) => {
  res.json({user:req.user});
});



router.post('/bus',(req, res)=> {
  console.log("hey");
 from = req.body.from;
 to = req.body.to;
  console.log(from +' '+ to); 
  bus.getbus(from,to, (err,bus)=>{
  console.log('finding');
  console.log(bus);
  details= bus;
  console.log(details);
  if(err){
    console.log(err);
    throw err;
  }
  if(bus==0){
    console.log("fahaa;af");
    return res.json({success: false, msg: 'Bus not found'});
  }
  else{
    console.log('--------');
    res.json({
      success:true,
      bus:bus
    })
  }
});
});

router.get('/dashboard', (req,res,next) => {
  dashboard.find().exec(function(err,dashboard){
    if(err){
      console.log('..................');
    }
    else{
      res.json({dashboard});
    }
  })
});

router.post('/seats',(req,res,next)=>{
  console.log("seats");
  var newseat = new seats({
    index: req.body.index,
    });
  console.log(newseat);
  
  seats.addSeat(newseat, (err, seats)=> {
    if(err){
      console.log(err);
      res.json({success: false, msg: 'Failed to book'});
    }
    else{
      console.log("Hello");
     res.json({success: true, msg: 'Seat Booked'});
   }
  });

});

router.get('/booking', (req,res)=>{
  console.log('Booking');
  seats.find({}).exec(function(err,seats){
    if(err){
      console.log('Error');
      throw err;
    }else{
      res.json({seats});
    }
  })
  
});


module.exports = router;