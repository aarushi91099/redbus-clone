const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../config/db');

// User Schema
const UserSchema = mongoose.Schema({
  name  : {
    type: String
  },
  email : {
    type: String,
    required: true
  },
  username : {
    type: String,
    required: true
  },
  password : {
    type: String,
    required: true
  }
},{collection:"users"});

// UserSchema.pre('save', function (next) {
//   bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(this.password, salt, (err, hash) => {
//           this.password = hash;
//           this.saltSecret = salt;
//           next();
//           console.log(hash)
//       });
//   });
// });

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username};
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) {
           console.log(err);
           throw err;
        }
        else {
            newUser.password = hash;
            console.log(hash);
            newUser.save(callback);
        }
      
    });
    console.log(newUser.password);
  });
} 

module.exports.comparePassword = function(candidatePassword, hash, callback){
  
  console.log("PASSWORD COMPARING")
  bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
    console.log(hash);
      if(err){
        console.log(err);
        throw err;
      }    
      else{
        console.log("NO ERROR... MOVING ON");
        callback(null, isMatch);
      }
  });
}