var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var uuid = require("uuid");
const passport = require('passport');
var db = require("./database/db");
const cors = require("cors");
require('dotenv').config()


// passport config
passport.serializeUser((user, done) => {
  done(null, user.usuario_id);
});
passport.deserializeUser((id, done) => {
    db.query("select * from usuarios where usuario_id = ?", id, (err,resu) => {
      if (err) done(err, false);
      else done(null,resu[0]);
    })
});

//end-points
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usuario');
var loginRouter = require("./routes/login");
var registro = require("./routes/registro");
var contacto = require("./routes/contacto");
var reset = require("./routes/reset");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: true, credentials: true, methods:'GET,PUT,POST,DELETE,OPTIONS', allowedHeaders:'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization'}));
app.use(session({
    genid: () => {
      return uuid()
    },
    name: "balance",
    // store: en produccion ver de usar un store ya sea mysql, redis o session-file-store
    secret: process.env.SessionSecret,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: { 
        secure: false, // en produccion true pero requiere SSL para funcionar.
        httpOnly: true,
        maxAge: 1000 * 60 * 30,
        sameSite: true,
        }
  }));
app.use(passport.initialize());
app.use(passport.session());

//  el modulo Cors con su configuracion hace lo mismo q este script 
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
//   if ('OPTIONS' == req.method) {
//        res.send(200);
//    } else {
//        next();
//    }
//   });

// rutas
app.use('/', indexRouter);
app.use('/usuario', usersRouter);
app.use("/login",loginRouter);
app.use("/registro", registro);
app.use("/logout", require("./routes/logout"));
app.use("/contacto", contacto);
app.use ("/reset", reset)

// 
module.exports = app;

