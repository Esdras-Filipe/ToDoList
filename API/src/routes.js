var express = require("express");
var router  = express.Router();

const usuarios = require("./routes/usuario.js");

router.use("/usuario", usuarios);

module.exports = router;
