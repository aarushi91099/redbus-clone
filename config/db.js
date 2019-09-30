const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/redbus_clone',{ useNewUrlParser: true}, (err) => {
    if (!err) {
        console.log('MongoDb connection succeeded.')
        // console.log(url);
    }
    else {
        console.log('Error in db connection: ' + err)
    }
});


module.exports = mongoose;

