var express = require('express');
var router = express.Router();
var db = require("../database/db");
require('dotenv').config()
const passport = require('passport');
require("../passaport")
const moment = require("moment");
const jwt = require("jsonwebtoken")

const secret = process.env.JwtSecret

// funcion de validacion de usuario para las sessiones
const auth = (req,res,next) => {
  if (!req.user) return res.json({message: "Session expirada, por favor login", error: "user"})
  else next();
};

// funcion de validacion de usuario para beader token
const validateToken = (req, res, next) => {
   if (!req.headers.authorization){
     console.log("no auth")
     return res.status(401).json({message: "Session experida, por favor longin", erro : "user"})
   } else {
      let token = req.headers.authorization.split(" ")[1]
      console.log(token)
      jwt.verify(token, secret, (err, data)=>{
        console.log(data)
        if (err) return res.status(401).json({message: "Session experida, por favor longin", erro : "user"})
        else if ( data == undefined) return res.status(401).json({message: "Session experida, por favor longin", erro : "user"})
        else {
          console.log(data.data.usuario_id)
           req.body.usuario_id = data.data.usuario_id;
          next()
        }
      })
   }
}

// obtener usuario
router.get("/", validateToken, (req,res) => {
  let id = req.body.usuario_id;
  db.query("select * from usuarios where usuario_id = ? ", id, (err,resu)=>{
    if (err) return res.json(err)
    else {
      console.log(resu[0] + "datos usuario")
      res.json(resu[0]);
    }
  })
})

// obtener balances de un usuario
router.get("/balance", validateToken, (req,res)=> {
  console.log(req.body.usuario_id)
  let id = req.body.usuario_id
  db.query("select * from balances where usuario_id = ? order by fecha desc",id, (err,resu)=>{
    if(err) return res.json(err);
    else {
      console.log(resu+ "aca estan tus balances");
      return res.json(resu);
    }
  })
}) 

// agregar un balance
router.post("/balance", validateToken, (req,res)=>{
  let data = {
    usuario_id: req.body.usuario_id,
    monto: req.body.monto,
    fecha: moment(req.body.fecha).format("YYYY/MM/DD"),
    concepto: req.body.concepto,
    forma: req.body.forma
  };
  db.query("insert into balances set ?", data, (err,resu)=>{
    if (err) return res.json(err)
    else {
      console.log(resu+ "aca esta el balanace")
      res.json({message: "Balance agregado correctamente"})
    }
  })
})

// borrar un balance
router.delete("/balance/:balance_id", validateToken, (req,res)=>{
  let balance_id = req.params.balance_id;
  db.query("delete from balances where balance_id = ?", balance_id, (err,resu)=>{
    if (err) return res.json(err);
    else {
      console.log(resu + "delete confirmado");
      res.json({message: "balance borrado exitosamente"});
    }
  })
})

// update un balance
router.put("/balance",validateToken,(req,res)=>{
  let balance_id = req.body.balance_id;
  let data = {
    usuario_id : req.body.usuario_id,
    monto: req.body.monto,
    fecha: moment(req.body.fecha).format("YYYY/MM/DD"),
    concepto: req.body.concepto,
    forma: req.body.forma
  };
  db.query("update balances set ? where balance_id = ?", [ data, balance_id],(err,resu)=>{
    if(err) 
    { console.log(err)
      res.json(err)}

    else {
      console.log(resu + "balance editado");
      res.json({message:" Balance editado correctamente"});
    }
  })

})

 // obtener los generos
  router.get("/balance/generos", (req,res)=>{
    db.query("select * from generos", (err,resu)=>{
      if (err) return res.json(err)
      else {
        console.log(resu);
        res.json(resu);
      }
    })
  })

  // obtener los conceptos

  router.get("/balance/conceptos/gastos", (req,res)=>{
    db.query("select * from conceptos where tipo = 0 or tipo = 1", (err,resu)=>{
      if (err) return res.json(err)
      else {
        console.log(resu);
        res.json(resu);
      }
    })
  })

  router.get("/balance/conceptos/ingresos", (req,res)=>{
    db.query("select * from conceptos where tipo = 0 or tipo = 2", (err,resu)=>{
      if (err) return res.json(err)
      else {
        console.log(resu);
        res.json(resu);
      }
    })
  })

  // obtener formas 

  router.get("/balance/formas", (req,res)=>{
    db.query("select * from formas", (err,resu)=>{
      if (err) return res.json(err)
      else {
        console.log(resu);
        res.json(resu);
      }
    })
  })
  
  // filtro de balances
  router.post("/balance/filter", (req,res)=>{
    var id= req.body.usuario_id;
    var monto = req.body.monto;
    var concepto = req.body.concepto;
    var forma = req.body.forma;
    var fecha = req.body.fecha;
    var query = "select * from balances where usuario_id = ?";
    let data = [id];

    console.log(concepto, forma, fecha, monto)
    if (monto == null){
      query = query
    }
    if( monto == "Ingresos" ){
      query = query + " and monto > 0"
    } 
    if (monto == "Gastos"){
      query = query + " and monto < 0"
    }
    if (monto == "Todos") {
    query = query}

    if (fecha == undefined || fecha == null || fecha == ""){
      query = query
    } else {
      data.push(moment(fecha).format("YYYY"), moment(fecha).format("MM"));
      query = query + "  and  YEAR(fecha) = ? and MONTH(fecha) = ? ";
    }

    if (concepto == null){
      query = query
    } else {
        if (concepto.length == 1 )
        {query= query + " and concepto = ?"
        data.push(concepto)}
        if(concepto.length > 1){
          data.push(concepto[0]);
          query = query + " and concepto = ?"
          for(let value of concepto) {
          if (concepto[0] != value)
        {  data.push(value);
          query = query + " or concepto = ?"}
        }
        }}

     if (forma == null){
       query= query
     } else {  
      if (forma.length == 1)
      {query= query + " and forma = ?"
      data.push(forma)}
      if(forma.length >1){
        data.push(forma[0]);
        query = query + " and forma = ?"
        for(let value of forma) {
        if (forma[0] != value)
      {  data.push(value);
        query = query + " or forma = ?"}
      }}}
      query = query + " order by fecha desc"

    console.log(query, data, fecha)
    db.query(query, data, (err, resu, info)=>{
      if (err) console.log(err), res.status(404).json({message: "Error al conectar al servidor", error : err})
      else if (resu.length <=0)  console.log(resu), res.status(200).json({message: "No se encontraron Balances", error: "balances" })
      else console.log(resu), res.status(200).json(resu)
    })
  })



module.exports = router;
