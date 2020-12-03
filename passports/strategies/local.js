var LocalStrategy = require('passport-local').Strategy;



///// PASSPORT STRATEGY////////////////

module.exports = (passport,User)=>{


  passport.use(new LocalStrategy({

     usernameField : 'email',
     passwordField : 'password',
   },
    function(email, password, done) {




      User.findOne({ 'local.email' :  email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          console.log("usuario no encontrado")
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)){
          console.log("password erróneo")
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));



}

