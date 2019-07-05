var express = require("express");
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require("../passaport")
require('dotenv').config()





router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.json({message: "Error al conectar al servidor", error: err}); }
      if (!user) { return res.json(info); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        else {
          const data = { usuario_id: user.usuario_id,
           nombre : user.nombre,
           }
          const token = jwt.sign({data}, process.env.JwtSecret ,{expiresIn: "15m"});
          console.log(" enviando: " + data + token)
          res.json({data, token, message : `Bienvenid@: ${user.nombre}`});
        }
        
      });
    })(req, res, next);
  });



module.exports = router; 