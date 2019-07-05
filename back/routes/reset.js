var express = require("express");
var router = express.Router();
var db = require("../database/db");
var jwt = require ("jsonwebtoken");
const nodemailer = require("nodemailer");
require('dotenv').config()
const secret = process.env.JwtSecret
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post("/",(req,res,next)=>{
    let mail = req.body.mail;
    db.query("select usuario_id, nombre from usuarios where mail = ? ", mail, (erro, resu, info)=>{
        if(erro) res.status(500).json({message: "Error al conectar al servidor", error : "db"});
        else if (resu.length <= 0 ) res.status(200).json({message:"Mail no registrado", error: "user"});
        else {
            nombre = resu[0].nombre;
            id = resu[0].usuario_id;
            const token = jwt.sign({"mail": mail, "usuario_id": id }, secret, {expiresIn: "1h"})

            async function main(){

                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: "balance.app.web@gmail.com" ,// generated ethereal user
                      pass: process.env.MailPass // generated ethereal password
                    }
                  });
                let info = await transporter.sendMail({
                  from: '"Balance" <balance.app.web@gmail.com', 
                  to: mail, 
                  subject: "Balance Reset Password", 
                  html: `<h1>Balace</h1> <p>Para restablecer tu password ingresa al siguiente link: <a href="http://localhost:4200/reset/${id}/${token}">Reset Password</a></p> `
                
                }).then(()=> res.status(200).json({message: "Mail enviado ..."}) )
                .catch(()=> res.status(200).json({message:"Error al enviar el mail", error: "mail"}))
                ;
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                
              }

              main().catch(console.error);
              
        }
    }) 
} )

router.post("/password", (req, res, next)=>{
    console.log(req.body.password, req.body.usuario_id)
    bcrypt.hash(req.body.password, saltRounds, function(error,hash){
         let password = hash
         let id = req.body.usuario_id
         db.query("update usuarios set password = ? where usuario_id = ?" , [password,id], (err, resu, info)=>{
             if (err) res.json({message: "Error al conectar al servidor", error: err})
             else if ( resu.length<=0) res.json({message: "Usuario no encontrado", error: "user"})
             else {
                 console.log(resu)
                 res.json({message: "Password actualizado corectamente" })
             }
         })
    })
})

router.get("/auth/:usuario_id", (req,res,next)=>{
    let id = req.params.usuario_id;
    let token = req.headers.authorization;
    jwt.verify(token, secret, (err,data)=> {
        if (err) res.send(false), console.log(err)
        else if (data == undefined) res.send(false)
        else {
                if (id != data.usuario_id) res.send(false) , console.log(data, id)
                else res.send(true), console.log(data)
            }
    })
})


module.exports= router;