var express = require("express");
var router = express.Router();

router.get("/",(req,res)=>{
    req.logout()
    res.json({message: "logout"})
  })

  
module.exports = router;