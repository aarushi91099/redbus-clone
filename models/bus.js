require('../config/db');

const mongoose = require('mongoose');


var busSchema = new mongoose.Schema({
    from : {
        type: String
    },
    to : {
        type: String
    },
    seats : {
        type: Number
    },
    timing : {
        type: String
    }
}, {collection: 'bus'});


var bus = module.exports = mongoose.model('bus', busSchema);


module.exports.getbus = function(from,to, callback){

    const query = {from: from, to:to};
    console.log("-----------------Qry");
    console.log(query);
    bus.find(query,callback);
    //cons1ole.log("------here-----");
    //console.log(busData);
  }

