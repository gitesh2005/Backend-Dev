const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");
const bcrypt = require("bcrypt");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const userFound = await User.findOne({ username });

        if (!userFound) {
          return done(null, false, { message: "User not found" });
        }

        const passMatch = await bcrypt.compare(password, userFound.password);

        if (!passMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, userFound);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    console.log("Serialize user called:", user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const foundUser = await User.findById(id);
      console.log("Deserialized user:", foundUser);
      done(null, foundUser);
    } catch (error) {
      done(error);
    }
  });
};