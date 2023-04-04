const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
const User = require('../model/users-model')


passport.serializeUser((user, done)=> {
  done(null, user.id)
})

passport.deserializeUser( async(id, done) => {
  try {
      const user = await User.findById(id)
      done(null, user)
  } catch (error) {
    console.log(error.message);
  }
})

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect"
  },(accessToken, refreshToken, profile, done) => {
    // check if user already exists in the database

    const checkUser = async() => {
        try {
          const currentUser = await User.findOne({googleID: profile.id})
          if (currentUser){
             // already exists
             console.log("User already exists")
             done(null, currentUser)
          }
          else{
              // create new user
              const newUser = await User.create({
                username:profile.displayName,
                googleID:profile.id,
                photoURL:profile.photos[0].value
              })
              console.log(`Added user ${newUser}`);

              done(null, newUser)
          }
        } 

        catch (error) {
          console.log(error.message);
        }
    }

    checkUser()
  }
));

