const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../services/user/user.services");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findUserByID(id);
    if (user) {
      return done(null, user);
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findUserByEmail(email);

        //user is found
        if (user) {
          const isValid = await bcrypt.compare(password, user.password);

          if (isValid) {
            return done(null, user, { message: "Authentication successful" });
          } else {
            return done(null, false, { message: "Password is not valid" });
          }
        } else {
          return done(null, false, { message: "User not found" });
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);
