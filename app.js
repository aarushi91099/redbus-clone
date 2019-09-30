require('./config/db');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const bcrypt = require('bcryptjs');
// const expressLayouts = require('express-ejs-layouts');


const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


// app.use(expressLayouts);
// app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));


app.use(cors());

app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log ('server is running at port ' + PORT));