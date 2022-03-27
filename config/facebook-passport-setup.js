
var FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const User = require('../models/User');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // User.findById({_id:id}, function (user) {
    // console.log(user);
    done(null, user);
    // });
});



passport.use(new FacebookStrategy({
    clientID:  process.env.FACEBOOK_CLIENT_ID,
    clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ AuthId: profile.id }, function (err, user) {
        //     console.log('====================================');
        //     console.log(user);
        //     console.log('====================================');
        //     return cb(err, user);

        // });

        const user = await User.findOne({ AuthId: profile.id });
        if (user) {
            return done(null, user);
        }
        // console.log('====================================');
        // console.log(profile);
        // console.log('====================================');
        const nameArr = profile.displayName.split(' ');
        const newUser = new User({
            AuthId: profile.id,
            username: profile.username,
            firstName: nameArr[0],
            lastName: nameArr[1],
            // email: profile.emails[0].value,
            photo: profile.profileUrl,
            // username: profile.displayName
        });
        await newUser.save();
        return done(null, newUser);
    }

));



