var express = require("express");
const Usuario = require("../classes/Usuario");
var router = express.Router();

router.get("/", async function (req, res) {
    usuario = new Usuario({ nome: req.query.nome});

    usuario.BuscaUsuario().then((response) => {
        res.status(200).send({
            status: "success",
            usuario: {
                ...response
            }
        });
    }).catch((error) => {
        res.status(500).send({
            status: "error",
            sqlMessage: error
        });
    });
});

router.get("/validaLogin", async function (req, res) {
    if(req.query == null || req.query ==  undefined){
        res.status(400).send({
            status: "error",
            message: "Nome de Usuario e Senha estao vazios"
        });
        return false; 
    }

    if(req.query.nome == undefined || req.query.nome == null){
        res.status(400).send({
            status: "error",
            message: "Nome do usuario nao pode ser nulo"
        });
        return false;
    }

    if(req.query.senha == undefined || req.query.senha == null){
        res.status(400).send({
            status: "error",
            message: "Senha do usuario nao pode ser nulo"
        });
        return false;
    }

    usuario = new Usuario({ nome: req.query.nome, senha: req.query.senha});

    usuario.ValidaLogin().then((response) => {
        res.status(200).send({
            status: "success",
            ...response
        });
    }).catch((error) => {
        res.status(500).send({
            status: "error",
            sqlMessage: error
        });
    });
});

router.post("/", async function (req, res) {
    usuario = new Usuario(req.body);

    usuario.Insere().then((response) => {
        res.status(200).send({
            ...response
        });
    }).catch((error) => {
        res.status(500).send({
            status: "error",
            sqlMessage: error
        });
    });
});

module.exports = router;
