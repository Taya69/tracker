// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
// const mongoose = require('mongoose')
// const User = mongoose.model('users')
const keys = require('../config/keys')

// //require('dotenv').config();
// // const jwtOptions = {
// //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// //     secretOrKey: process.env.SECRET
// // };

// const options = {
//     JwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: keys.jwt    
// }

// module.exports = passport => {
//     passport.use(
//         new JwtStrategy (options, async (payload, done)=> {
//             try {
//                 const user = await User.findById(payload.userId).select('email id')
//                 if (user) {
//                     done(null, user)
//                 } else {
//                     done(null, false)
//                 } 
//             } 
//             catch (e) {
//                 console.log(e)              
//             }           
//         })
//     )
// }


var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwt;

module.exports = passport => {
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        console.log(jwt_payload.sub, 3333)
        if (err) {            
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}))
};