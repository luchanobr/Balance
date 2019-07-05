var mysql = require("mysql");
require('dotenv').config()

var conexion = mysql.createConnection({
    host: process.env.DB_host,
    user: process.env.DB_User,
    password: process.env.DB_Pass,
    database: process.env.DB_DB,
    port: process.env.DB_Port
});

conexion.connect((err)=>{
    if (err){
        console.log(err, "Error al conectar a la base de datos");
    } else {
        console.log("Conectado a la base de datos");
    }
});

module.exports = conexion;