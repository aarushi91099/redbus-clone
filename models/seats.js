require('../config/db');

const mongoose = require('mongoose');

var seatSchema = new mongoose.Schema({
    index:{
        type:String
    }
}, {collection:'seats'});

var seats = module.exports =  mongoose.model('seats', seatSchema);


module.exports.addSeat = function(newseat, callback){
    newseat.save(callback);
  } 
