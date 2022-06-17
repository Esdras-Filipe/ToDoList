const e = require("express");
const Bd = require("./conexao/Bd");

class Usuario {

    id;
    nome;
    senha;
    data_criacao;

    constructor(params) {
        this.id           = params.id;
        this.nome         = params.nome;
        this.senha        = params.senha;
        this.data_criacao = params.data_criacao;
        this.conexao      = new Bd();
    }

    async Insere() {
        return new Promise((resolve, reject) => {
             // Verifico se ja nao existe um usuario com esse nome cadastrado na base de dados
            this.BuscaUsuario().then((response) => {
                if (response.length == 0) {
                    let query = `INSERT INTO Usuarios VALUES(NULL, '${this.nome}' , '${this.senha}', '${this.data_criacao}')`;
                    this.conexao.execQuery(query).then((response) => {
                        resolve({
                            status: "success",
                            message: "Usuario Cadastrado com Sucesso!"
                        });
                    }).catch((error) => {
                        reject(error);
                    }); 
                } else {
                    resolve({
                        status: "error",
                        message: "Ja existe um usuario com esse Nome Cadastrado na base de dados"
                    });
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }

    async ValidaLogin() {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM Usuarios WHERE nome = '${this.nome}' AND senha = '${this.senha}'`;
            this.conexao.execSelect(query).then((rows) => {
                if (rows.length === 0) {
                    resolve({
                        message: "Usuario nao encontrado na base de dados",
                        usuario: [] 
                    });   
                } else {
                    resolve({
                        status: "success",
                        message: "Usuario validado com sucesso",
                        usuario: [...rows]
                    });
                }
            }).catch((error) => {
                reject(error);
            }); 
        });
    }

    async BuscaUsuario() {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM Usuarios WHERE nome = '${this.nome}'`;
            this.conexao.execSelect(query).then((rows) => {
                resolve(rows);
            }).catch((error) => {
                reject(error);
            });  
        })
    }

    async Atualiza() {
        let query = `UPDATE Usuarios SET senha = '${this.senha}' WHERE id = '${this.id}' AND nome = '${this.nome}' `;
    }
}

module.exports = Usuario;