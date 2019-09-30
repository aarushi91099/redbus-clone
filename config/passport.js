const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../models/user');
const bus = require('../models/bus');
const confiq = require('../config/db');

module.exports = function(passport){
    console.log('hcgxhg');
    var opts = {};
    console.log('bhbhb');
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'mysecret';
    console.log('hi');
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        console.log('hello');
        console.log(jwt_payload);
        User.getUserById(jwt_payload.id, (err,user)=> {
            if (err) {
                return done(err, false);
            }
            if (user) {
                console.log(user);
                return done(null, user);

            } else {
                return done(null, false);
            }
       }); 
    }));
    

}