var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/User');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // User.findById({_id:id}, function (user) {
        done(null, user);
    // });
});

passport.use(new GoogleStrategy({
    clientID:  process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
},
    async function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        // console.log('====================================');
        // console.log(profile);
        // console.log('====================================');

        const user = await User.findOne({ AuthId: profile.id });
        if (user) {
            return done(null, user);
        }

        const newUser = new User({
            AuthId: profile.id,
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            // username: profile.displayName
        });
        await newUser.save();   
        return done(null, newUser); 
        
        


        // // process.nextTick(function () {

        // User.findOne({ 'google.id': profile.id }, function (err, user) {
        //     if (err)
        //         return done(err);

        //     if (user) {

        //         // if a user is found, log them in
        //         return done(null, user);
        //     }
        //     // console.log(profile);
        //     // return done(null, profile);
        //     else {
        //         // if the user isnt in our database, create a new user
        //         var newUser = new User();

        //         // set all of the relevant information
        //         console.log('====================================');
        //         console.log(profile);
        //         console.log('====================================');
        //         newUser.google.id = profile.id;
        //         newUser.google.token = token;
        //         newUser.google.name = profile.displayName;
        //         newUser.google.email = profile.emails[0].value; // pull the first email

        //         // save the user
        //         newUser.save(function (err) {
        //             if (err)
        //                 throw err;
        //             return done(null, newUser);
        //         });
        //     }
        // });
        // );
    }
));