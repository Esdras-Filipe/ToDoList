const mysql = require("mysql2/promise");

class Bd {
    getConnection() {
        // create the connection to database
        return new Promise((resolve, reject) => {
            mysql.createConnection({
                host: "127.0.0.1",
                port: "3306",
                user: "root",
                password: "root",
                database: "ToDoList",
            }).then((connection) => {
                resolve(connection);
            }).catch((error) => {
                reject(error.sqlMessage);
            });
        });
    }

    async execQuery(query) {
        return new Promise((resolve, reject) => {
            this.getConnection().then((connection) => {
                connection.query(query).then(() => {
                    connection.end();
                    resolve("Success");
                }).catch((erro) => {
                    connection.end();
                    reject(erro);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    async execSelect(query) {
        return new Promise((resolve, reject) => {
            this.getConnection().then((connection) => {
                connection.query(query).then(([rows]) => {
                    connection.end();
                    resolve(rows);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = Bd;
