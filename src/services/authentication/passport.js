const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        //user is found
        if (user) {
          const isValid = await bcrypt.compare(password, user.password);

          if (isValid) {
            return done(null, user, { message: "Authentication successful" });
          } else {
            return done(null, false, { message: "Password is not valid" });
          }
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);
