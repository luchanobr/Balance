var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
require('dotenv').config()


router.post("/", (req,res,next)=>{
  let data = {
        nombre: req.body.nombre,
        mail: req.body.mail,
        text: req.body.text
    }

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
     
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Balance" <balance.app.web@gmail.com', // sender address
          to: data.mail, // list of receivers
          subject: "Balance mail recibido", // Subject line
          text: `Gracias ${data.nombre} por contactarte con Balance, en la brevedad tu consulta será respondida. `, // plain text body
        
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      
      main().catch(console.error);

    res.json({message: "Gracias por contactarte con Balance"})

})


module.exports = router;
