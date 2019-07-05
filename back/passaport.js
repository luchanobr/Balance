const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var db = require("./database/db");
const bcrypt = require('bcrypt');

// passport local strategy

passport.use(new LocalStrategy({
    usernameField: "mail"
  },
  function(mail, password, done){
      db.query("Select * from usuarios where mail = ? ", [mail], (err,resu) => {
          if (err) {
             console.log(err.message);
             return done(err)
          }
          else if (resu.length <= 0) {
              console.log("Mail no registrado");
              return done(null, false, { message: "Mail no registrado!", error: "error"})
          }
          else {
              bcrypt.compare(password, resu[0].password, function(err, resp) {
                  if (err) {
                    console.log(err.message);
                    return done(err);
                  } else if ( resp== false ) {
                    console.log("Password invalido");
                    return done(null, false, {message: "Password incorrecto", error: "error"});
                  }
                  else if (resp == true)  {
                      console.log(resu);
                      return done(null, resu[0]);
                   } 
               })};
          }) 
  }
  ));
  

  