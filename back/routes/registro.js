var express = require("express");
var router = express.Router();
var db = require("../database/db");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const jwt = require("jsonwebtoken");
const moment = require("moment");
require ("../passaport");


router.post("/", (req,res,next) => {
    bcrypt.hash(req.body.password, saltRounds, function(error,hash) {
       
        let data = {
            nombre : req.body.nombre,
            apellido : req.body.apellido,
            mail : req.body.mail,
            password: hash,
            genero : req.body.genero,
            nac : moment(req.body.fecnac).format("YYYY/MM/DD"),
            telefono: req.body.telefono,
        };
        db.query("Select mail from usuarios where mail = ?", [data.mail], (err,resu) => {
            if (err) console.log(err.message), res.json({error: err, message: "Error al conectaco con el servidor"});
            else if (resu.length > 0) {
                return res.json({ message:"Mail ya registrado", error: "error"});
            } else {
                db.query("insert into usuarios set ?", data, (err,resu) => {
                    if (err) {
                    res.json({ message: "Error al crear al usuario: " , error: err.message});
                    console.log(err);
                    }
                    else {
                      res.status(200).json({message: "Registrado correctamente"})
                    }
                    });
                };
            });

    });

})

module.exports = router;