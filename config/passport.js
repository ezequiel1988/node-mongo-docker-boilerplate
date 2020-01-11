const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/loginModel");

passport.use(
  "passport",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { mensaje: "Usuario no encontrado" });
      } else {
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { mensaje: "Password incorrecto" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
