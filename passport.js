var mongoose = require('mongoose');
var passport = module.exports = require('passport');
var User = mongoose.model('User');

var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google').Strategy.

var config = require('./config.js');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null,user);
  });

  passport.deserializeUser(function(obj, done){
    done(null,obj);
  });

  passport.use(new FacebookStrategy({

          // pull in our app id and secret from our auth.js file
          clientID        : config.facebook.clientID,
          clientSecret    : config.facebook.clientSecret,
          callbackURL     : '/auth/facebook/callback',
          scope           :'email,public_profile,user_friends'
      },

      // facebook will send back the token and profile
      function(token, refreshToken, profile, done) {

          // asynchronous
          process.nextTick(function() {

              // find the user in the database based on their facebook id
              User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                  // if there is an error, stop everything and return that
                  // ie an error connecting to the database
                  if (err)
                      return done(err);

                  // if the user is found, then log them in
                  if (user) {
                      return done(null, user); // user found, return that user
                  } else {
                      // if there is no user found with that facebook id, create them
                      console.log(profile);
                      var newUser            = new User();

                      // set all of the facebook information in our user model
                      newUser.facebook.id    = profile.id; // set the users facebook id
                      newUser.facebook.token = token; // we will save the token that facebook provides to the user
                      newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
                      newUser.facebook.email = profile.email; // facebook can return multiple emails so we'll take the first

                      // save our user to the database
                      newUser.save(function(err) {
                          if (err)
                              throw err;

                          // if successful, return the new user
                          return done(null, newUser);
                      });
                  }

              });
          });

      }));

//   passport.use(new FacebookStrategy({
//     clientID: config.facebook.id,
//     clientSecret : config.facebook.secret,
//     callbackURL : '/auth/facebook/callback',
//     profileFields : ['id','displayName', 'provider', 'photos']
//   }, function(accessToken, refreshToken, profile, done){
//     User.findOne({provider_id: profile.id}, function(err,user){
//       if(err) throw(err);
//       if(!err && user!= null) return done(null,user);
//
//       console.log(profile);
//
//       // var newUser = new User({
//       //   provider_id :profile.id,
//       //   provider: profile.provider,
//       //   name: profile.displayName,
//       //   photo :profile.photos[0].value
//       // });
//
//       //newUser.save(function(err){
//       //   if(err) throw err;
//       //   done(null, user);
//       // });
//     })
//   }
//
// ))
}
